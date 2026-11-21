import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export default async function BusinessDashboardPage() {
  if (!hasSupabaseConfig()) redirect("/business");

  const supabase = await createServerSupabase();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData.user) redirect("/business");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", userData.user.id)
    .single();

  return (
    <main className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">Típico Business</p>
        <h1>Gestión</h1>
      </header>
      <section className="page-content">
        <p className="notice">
          Sesión autenticada: {profile?.full_name ?? userData.user.email ?? "Usuario"}.
          Los indicadores se mostrarán únicamente cuando existan datos medidos.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginTop: 36 }}>
          {["Carta", "Cinco platos", "Lista de espera", "Contenido"].map((label) => (
            <article key={label} style={{ minHeight: 150, background: "#171715", color: "#efe8d8", padding: 24 }}>
              <p style={{ color: "#c1a26a", textTransform: "uppercase", letterSpacing: ".14em", fontSize: 10 }}>{label}</p>
              <strong style={{ display: "block", marginTop: 38, fontFamily: "Instrument Serif, Georgia, serif", fontSize: 25, fontWeight: 400 }}>Configuración</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
