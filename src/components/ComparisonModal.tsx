"use client";

import { useConfigStore } from "@/store/configurator";
import { ALL_OFFERS, CATEGORIES } from "@/data/offers";
import { OPERATORS_MAP } from "@/data/operators";
import type { Offer } from "@/types";
import { X } from "lucide-react";

export default function ComparisonModal() {
  const comparisonIds = useConfigStore((s) => s.comparisonIds);
  const clearComparison = useConfigStore((s) => s.clearComparison);

  if (comparisonIds.length < 2) return null;

  const offers = comparisonIds
    .map((id) => ALL_OFFERS.find((o) => o.id === id))
    .filter(Boolean) as Offer[];

  /* Gather all unique feature keys */
  const featureSets = offers.map((o) => o.features.split("|").map((f) => f.trim()));
  const maxLen = Math.max(...featureSets.map((f) => f.length));
  const featureRows: string[][] = [];
  for (let i = 0; i < maxLen; i++) {
    featureRows.push(featureSets.map((fs) => fs[i] || "—"));
  }

  /* Find best price */
  const minPrice = Math.min(...offers.map((o) => o.price));

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && clearComparison()}>
      <div className="modal-card comparison-modal">
        <div className="modal-header">
          <h2>Confronta offerte</h2>
          <button className="btn-icon" onClick={clearComparison}>
            <X size={20} />
          </button>
        </div>
        <div className="comparison-grid">
          {/* Header row */}
          <div className="comp-row comp-header">
            <div className="comp-cell comp-label">Operatore</div>
            {offers.map((o) => {
              const op = OPERATORS_MAP[o.operatorId as keyof typeof OPERATORS_MAP];
              return (
                <div key={o.id} className="comp-cell" style={{ color: op?.brandColor }}>
                  {op?.displayName}
                </div>
              );
            })}
          </div>
          <div className="comp-row">
            <div className="comp-cell comp-label">Offerta</div>
            {offers.map((o) => (
              <div key={o.id} className="comp-cell comp-name">
                {o.name}
              </div>
            ))}
          </div>
          <div className="comp-row">
            <div className="comp-cell comp-label">Categoria</div>
            {offers.map((o) => (
              <div key={o.id} className="comp-cell">
                {o.category}
              </div>
            ))}
          </div>
          <div className="comp-row comp-price-row">
            <div className="comp-cell comp-label">Prezzo</div>
            {offers.map((o) => (
              <div
                key={o.id}
                className={`comp-cell comp-price ${o.price === minPrice ? "best-value" : ""}`}
              >
                €{o.price.toFixed(2).replace(".", ",")}/{o.billing.toLowerCase()}
                {o.price === minPrice && offers.length > 1 && (
                  <span className="best-badge">★ Migliore</span>
                )}
              </div>
            ))}
          </div>
          {/* Feature rows */}
          {featureRows.map((row, i) => (
            <div key={i} className="comp-row">
              <div className="comp-cell comp-label">Feature {i + 1}</div>
              {row.map((val, j) => (
                <div key={j} className="comp-cell">
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}