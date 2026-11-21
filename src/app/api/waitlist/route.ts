import { z } from "zod";
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

const waitlistSchema = z.object({
  restaurantSlug: z.string().min(1).max(80),
  guestName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  partySize: z.number().int().min(1).max(20),
  consent: z.literal(true),
});

const updateWaitlistSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["waiting", "notified", "seated", "cancelled"]),
});

export async function POST(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { error: "La lista de espera no está configurada." },
      { status: 503 }
    );
  }

  const parsed = waitlistSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revisa los datos introducidos." },
      { status: 400 }
    );
  }

  const supabase = await createServerSupabase();
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("id")
    .eq("slug", parsed.data.restaurantSlug)
    .single();

  if (restaurantError || !restaurant) {
    return NextResponse.json(
      { error: "No se ha podido validar el restaurante." },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("waitlist_entries")
    .insert({
      restaurant_id: restaurant.id,
      guest_name: parsed.data.guestName,
      phone: parsed.data.phone,
      party_size: parsed.data.partySize,
      status: "waiting",
      privacy_consent_at: new Date().toISOString(),
      retention_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("id, status, arrived_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "No se ha podido registrar la solicitud." },
      { status: 500 }
    );
  }

  return NextResponse.json({ entry: data }, { status: 201 });
}

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Sistema no configurado." }, { status: 503 });
  }

  const supabase = await createServerSupabase();
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { data: entries, error } = await supabase
    .from("waitlist_entries")
    .select("id, guest_name, phone, party_size, status, arrived_at, notified_at, seated_at")
    .is("deleted_at", null)
    .in("status", ["waiting", "notified", "seated"])
    .order("arrived_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "No se pudo consultar la sala." }, { status: 500 });
  }
  return NextResponse.json({ entries });
}

export async function PATCH(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Sistema no configurado." }, { status: 503 });
  }

  const parsed = updateWaitlistSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const supabase = await createServerSupabase();
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const timestampField =
    parsed.data.status === "notified" ? "notified_at" :
    parsed.data.status === "seated" ? "seated_at" :
    null;

  const updates: Record<string, string | null> = { status: parsed.data.status };
  if (timestampField) updates[timestampField] = new Date().toISOString();

  const { data, error } = await supabase
    .from("waitlist_entries")
    .update(updates)
    .eq("id", parsed.data.id)
    .select("id, status")
    .single();

  if (error) {
    return NextResponse.json({ error: "No se pudo actualizar la entrada." }, { status: 500 });
  }
  return NextResponse.json({ entry: data });
}
