"use client";

import type { CartItem, DiscountLine, OperatorId } from "@/types";
import { CATEGORIES } from "@/data/offers";
import { OPERATORS_MAP } from "@/data/operators";

interface CartSidebarProps {
  items: CartItem[];
  discountLines: DiscountLine[];
  total: number;
  operatorId: OperatorId | "all";
  onReset: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  Mobile: "📱",
  Fissa: "🏠",
  Energia: "⚡",
  Assicurazioni: "🛡️",
  Smartphone: "📞",
};

export default function CartSidebar({
  items,
  discountLines,
  total,
  onReset,
}: CartSidebarProps) {
  const categories = CATEGORIES.map((c) => c.name);

  if (items.length === 0) {
    return (
      <aside className="config-cart card">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <div>Nessuna offerta selezionata</div>
          <div className="cart-empty-hint">
            Usa i pulsanti + per aggiungere offerte al preventivo
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="config-cart card">
      <div className="cart-header">
        <h2>🛒 Riepilogo</h2>
        <button className="btn btn-ghost btn-sm" onClick={onReset}>
          Svuota
        </button>
      </div>

      {categories.map((cat) => {
        const catItems = items.filter((i) => i.offer.category === cat);
        if (catItems.length === 0) return null;
        const catTotal = catItems.reduce(
          (s, i) => s + i.offer.price * i.qty,
          0
        );

        return (
          <div key={cat} className="cart-group">
            <h3>
              <span>
                {CATEGORY_ICONS[cat]} {cat}
              </span>
              <span className="cat-total">
                €{catTotal.toFixed(2).replace(".", ",")}
              </span>
            </h3>
            {catItems.map((item) => {
              const op = OPERATORS_MAP[item.offer.operatorId as keyof typeof OPERATORS_MAP];
              return (
                <div key={item.offer.id} className="cart-line">
                  <span>
                    {op && (
                      <span
                        className="cart-line-dot"
                        style={{ backgroundColor: op.brandColor }}
                      />
                    )}
                    {item.offer.name} ×{item.qty}
                  </span>
                  <span className="line-price">
                    €{(item.offer.price * item.qty).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {discountLines.length > 0 && (
        <div className="cart-discounts">
          {discountLines.map((dl, i) => (
            <div key={i} className="cart-discount">
              <span>{dl.label}</span>
              <span>€{Math.abs(dl.amount).toFixed(2).replace(".", ",")}</span>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <div className="total-label">Totale mensile</div>
        <div className="total-value">€{total.toFixed(2).replace(".", ",")}</div>
      </div>

      <button className="btn btn-brand btn-block" style={{ marginTop: 12 }}>
        Genera Preventivo PDF
      </button>
    </aside>
  );
}