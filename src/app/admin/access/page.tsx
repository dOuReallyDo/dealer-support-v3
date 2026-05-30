"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

type Entry = { id: string; pdv_code: string; email: string; active: boolean };

export default function AdminAccess() {
  const [file, setFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pdv, setPdv] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    try {
      const j = await fetch("/api/admin/access/entries").then((r) => r.json());
      setEntries(j.entries || []);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/access/upload", { method: "POST", body: fd });
    const j = await r.json();
    setMsg(r.ok ? `Ingestion completata: ${j.rows} righe.` : j.error);
    await load();
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/access/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pdv_code: pdv, email }),
    });
    const j = await r.json();
    setMsg(r.ok ? "Entry salvata" : j.error);
    setPdv("");
    setEmail("");
    await load();
  }

  async function toggle(id: string, active: boolean) {
    await fetch("/api/admin/access/entries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    await load();
  }

  return (
    <div className="admin-layout">
      <ThemeToggle />
      <header className="admin-header">
        <h1>Accessi PDV</h1>
        <div className="admin-header-actions">
          <Link href="/admin/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>
      </header>
      <div className="admin-body">
        <nav className="admin-sidebar">
          <Link href="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/admin/matrix" className="nav-link">Matrice Offerte</Link>
          <Link href="/admin/access" className="nav-link active">Accessi PDV</Link>
        </nav>
        <main className="admin-main">
          {/* Excel upload */}
          <div className="admin-card">
            <div className="admin-card-title">Importa Excel</div>
            <form onSubmit={upload} className="upload-form">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mx-input"
              />
              <button className="btn btn-brand" type="submit">Importa</button>
            </form>
          </div>

          {/* Manual add */}
          <div className="admin-card">
            <div className="admin-card-title-sm">Aggiungi manualmente</div>
            <form onSubmit={add} className="manual-add-form">
              <div className="form-group">
                <label>PDV</label>
                <input className="mx-input" placeholder="001234" value={pdv} onChange={(e) => setPdv(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="mx-input" type="email" placeholder="email@pdv.it" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button className="btn btn-brand" type="submit">Salva</button>
            </form>
          </div>

          {msg && <div className="admin-msg">{msg}</div>}

          {/* Table */}
          <div className="admin-card admin-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>PDV</th>
                  <th>Email</th>
                  <th>Stato</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((x) => (
                  <tr key={x.id}>
                    <td>{x.pdv_code}</td>
                    <td>{x.email}</td>
                    <td>{x.active ? "✅ attiva" : "❌ disattiva"}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => toggle(x.id, !x.active)}>
                        {x.active ? "Disattiva" : "Attiva"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}