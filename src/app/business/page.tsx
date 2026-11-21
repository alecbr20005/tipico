"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";

export default function BusinessPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setMessage("Acceso no configurado. Falta configurar Supabase.");
      return;
    }
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("No se ha podido iniciar sesión.");
      return;
    }
    router.push("/business/dashboard");
  };

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero">
        <p className="eyebrow">Típico · Operación</p>
        <h1>Business</h1>
      </header>
      <main className="page-content">
        <p className="notice">Acceso privado protegido por Supabase Auth. No hay una contraseña demostrativa.</p>
        <form onSubmit={login} style={{ maxWidth: 420, display: "grid", gap: 12, marginTop: 36 }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo profesional" autoComplete="email" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" autoComplete="current-password" style={{ border: "1px solid #d2cbbd", padding: 14 }} />
          <button type="submit" style={{ border: 0, background: "#c1a26a", padding: "14px 22px", cursor: "pointer" }}>Iniciar sesión</button>
          {message && <p role="alert" style={{ color: "#8b2d24" }}>{message}</p>}
        </form>
      </main>
    </div>
  );
}
