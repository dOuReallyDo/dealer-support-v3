"use client";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminMatrix() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/matrix", { method: "POST", body: fd });
    const j = await r.json();
    setMsg(r.ok ? `Caricate ${j.rows} righe. Versione attiva: ${j.version_id}` : j.error);
  }

  return (
    <div className="admin-layout">
      <ThemeToggle />
      <header className="admin-header">
        <h1>Matrice Offerte</h1>
        <div className="admin-header-actions">
          <Link href="/admin/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>
      </header>
      <div className="admin-body">
        <nav className="admin-sidebar">
          <Link href="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/admin/matrix" className="nav-link active">Matrice Offerte</Link>
          <Link href="/admin/access" className="nav-link">Accessi PDV</Link>
        </nav>
        <main className="admin-main">
          <div className="admin-card">
            <div className="admin-card-title">Carica matrice offerte</div>
            <p className="admin-card-desc">
              Carica un file Excel (.xlsx) con le colonne: offer_code, offer_name, priority, e le colonne regole.
              La nuova versione diventerà attiva automaticamente.
            </p>
            <form onSubmit={upload} className="upload-form">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mx-input"
              />
              <button className="btn btn-brand" type="submit">Carica e attiva</button>
            </form>
            {msg && (
              <div className="admin-msg">
                {msg}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}