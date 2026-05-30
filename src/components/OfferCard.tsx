"use client";

import type { Offer, DiscountRule } from "@/types";
import { useConfigStore } from "@/store/configurator";
import { OPERATORS_MAP } from "@/data/operators";

interface OfferCardProps {
  offer: Offer;
  qty: number;
  rules: Record<string, DiscountRule>;
  onAdd: () => void;
  onRemove: () => void;
}

const CATEGORY_CLASS: Record<string, string> = {
  Mobile: "cat-mobile",
  Fissa: "cat-fissa",
  Energia: "cat-energia",
  Assicurazioni: "cat-assicurazioni",
  Smartphone: "cat-smartphone",
};

export default function OfferCard({ offer, qty, rules, onAdd, onRemove }: OfferCardProps) {
  const comparisonIds = useConfigStore((s) => s.comparisonIds);
  const toggleComparison = useConfigStore((s) => s.toggleComparison);
  const op = OPERATORS_MAP[offer.operatorId as keyof typeof OPERATORS_MAP];
  const catClass = CATEGORY_CLASS[offer.category] || "";
  const rule = offer.rules && rules[offer.rules];
  const hasDiscount = rule && rule.amount > 0;
  const isPromo = offer.promoPrice !== undefined;
  const isComparing = comparisonIds.includes(offer.id);

  return (
    <div
      className={`card-cat offer-card ${catClass} ${isComparing ? "comparing" : ""} animate-in`}
      data-operator={offer.operatorId}
    >
      <div className="offer-card-operator" style={{ backgroundColor: op?.brandColor || '#666' }}>
        {op?.displayName || offer.operatorId}
      </div>
      <div className="name">{offer.name}</div>
      <div className="desc">{offer.subtitle}</div>
      <div className="features">
        {offer.features.split("|").map((f, i) => (
          <span key={i} className="feature">
            {f.trim()}
          </span>
        ))}
      </div>
      <div className="price-row">
        <div>
          {isPromo && (
            <span className="price-strike">
              €{offer.basePrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="price">
            €{offer.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="billing"> /{offer.billing}</span>
        </div>
        {hasDiscount && (
          <span className="discount-badge">
            −€{rule.amount.toFixed(2).replace(".", ",")}
          </span>
        )}
        {isPromo && offer.promoLabel && (
          <span className="promo-badge">{offer.promoLabel}</span>
        )}
      </div>
      <div className="card-actions">
        <div className="qty-controls">
          <button type="button" onClick={onRemove} disabled={qty === 0}>
            −
          </button>
          <b>{qty}</b>
          <button type="button" onClick={onAdd}>
            +
          </button>
        </div>
        <button
          type="button"
          className={`btn-compare ${isComparing ? "active" : ""}`}
          onClick={() => toggleComparison(offer.id)}
          title="Confronta"
        >
          {isComparing ? "✓ Confronta" : "Confronta"}
        </button>
      </div>
    </div>
  );
}