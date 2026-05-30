"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    devices: "—",
    pdv: "—",
    offers: "71",
    matrixVersion: "—",
  });

  useEffect(() => {
    /* Load real KPIs from API */
    fetch("/api/admin/access/entries")
      .then((r) => r.json())
      .then((j) => {
        if (j.entries) setStats((s) => ({ ...s, pdv: String(j.entries.length) }));
      })
      .catch(() => null);
  }, []);

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <form action="/api/admin/logout" method="POST">
            <button className="btn btn-ghost btn-sm" type="submit">Logout</button>
          </form>
        </div>
      </header>
      <div className="admin-body">
        <nav className="admin-sidebar">
          <Link href="/admin/dashboard" className="nav-link active">Dashboard</Link>
          <Link href="/admin/matrix" className="nav-link">Matrice Offerte</Link>
          <Link href="/admin/access" className="nav-link">Accessi PDV</Link>
        </nav>
        <main className="admin-main">
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Dispositivi registrati</div>
              <div className="kpi-value">{stats.devices}</div>
              <div className="kpi-sub">Aggiornamento in tempo reale</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">PDV attivi</div>
              <div className="kpi-value">{stats.pdv}</div>
              <div className="kpi-sub">Lista autorizzata</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Offerte configurate</div>
              <div className="kpi-value">{stats.offers}</div>
              <div className="kpi-sub">5 categorie</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Versione matrice</div>
              <div className="kpi-value">{stats.matrixVersion}</div>
              <div className="kpi-sub">Carica un nuovo file</div>
            </div>
          </div>

          <div className="admin-cards-grid">
            <Link href="/admin/matrix" className="admin-action-card">
              <div className="admin-action-icon">📊</div>
              <div className="admin-action-title">Matrice offerte</div>
              <div className="admin-action-desc">
                Upload Excel, versionamento e attivazione server-side.
              </div>
            </Link>
            <Link href="/admin/access" className="admin-action-card">
              <div className="admin-action-icon">🔐</div>
              <div className="admin-action-title">Accessi PDV</div>
              <div className="admin-action-desc">
                Ingestion Excel PDV/email e modifiche puntuali.
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}