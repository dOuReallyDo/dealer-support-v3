"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) {
      const j = await r.json();
      setError(j.error || "Login fallito");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="dealer-login-wrap">
      <div className="dealer-login-card">
        <h1 className="login-title-accent">Admin Backend</h1>
        <p>Configurazione matrici e allowlist dealer.</p>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Password</label>
            <input
              className="mx-input mx-input-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button className="btn btn-brand btn-block" type="submit">
            Accedi
          </button>
        </form>
        <div className="login-footer">
          <a href="/" className="link-subtle">Torna al login dealer</a>
        </div>
      </div>
    </div>
  );
}