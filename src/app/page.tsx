"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Dealer } from "@/types";

export default function DealerHome() {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [email, setEmail] = useState("");
  const [pdv, setPdv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/dealer/me")
      .then((r) => r.json())
      .then((j) => {
        if (j.dealer) {
          setDealer(j.dealer);
          window.location.replace("/configuratore");
        }
      })
      .catch(() => null);
  }, []);

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/dealer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pdv_code: pdv }),
      });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};
      if (!res.ok) return setError(json.error || `Errore ${res.status}`);
      setDealer(json.dealer);
      window.location.replace("/configuratore");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dealer-login-wrap">
      <ThemeToggle />

      <div className="dealer-login-card">
        <div className="login-logo">
          <span className="login-logo-icon">🏪</span>
          <h1>Dealer Support</h1>
          <p className="login-subtitle">Configuratore offerte multi-operatore</p>
        </div>

        <form onSubmit={register} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="mx-input mx-input-lg"
              type="email"
              placeholder="nome@pdv.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pdv">Codice PDV</label>
            <input
              id="pdv"
              className="mx-input mx-input-lg"
              placeholder="Es. 001234"
              value={pdv}
              onChange={(e) => setPdv(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-msg">{error}</div>}
          {dealer && <div className="success-msg">Accesso verificato. Apertura configuratore…</div>}

          <button className="btn btn-brand btn-block" disabled={loading}>
            {loading ? "Verifica…" : "Accedi al configuratore"}
          </button>
        </form>

        <div className="login-footer">
          <a href="/admin/login" className="link-subtle">Area admin</a>
        </div>
      </div>
    </div>
  );
}