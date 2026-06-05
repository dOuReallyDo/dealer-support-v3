"use client";

import { useConfigStore } from "@/store/configurator";
import OperatorSelector from "@/components/OperatorSelector";
import OfferCard from "@/components/OfferCard";
import CartSidebar from "@/components/CartSidebar";
import ComparisonModal from "@/components/ComparisonModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getAllOffers, CATEGORIES, DISCOUNT_RULES } from "@/data/offers";

export default function ConfiguratorePage() {
  const selectedOperator = useConfigStore((s) => s.selectedOperator);
  const selectedCategory = useConfigStore((s) => s.selectedCategory);
  const selectCategory = useConfigStore((s) => s.selectCategory);
  const cart = useConfigStore((s) => s.cart);
  const addToCart = useConfigStore((s) => s.addToCart);
  const removeFromCart = useConfigStore((s) => s.removeFromCart);
  const clearCart = useConfigStore((s) => s.clearCart);
  const discountLines = useConfigStore((s) => s.discountLines);
  const total = useConfigStore((s) => s.total);
  const comparisonIds = useConfigStore((s) => s.comparisonIds);

  /* Filter offers by operator and category */
  const allOffers = getAllOffers();
  const filtered = allOffers.filter((o) => {
    if (selectedOperator !== "all" && o.operatorId !== selectedOperator) return false;
    if (selectedCategory !== "all" && o.category !== selectedCategory) return false;
    return true;
  });

  /* Get discount rules for the current operator */
  const rules =
    selectedOperator === "all"
      ? Object.values(DISCOUNT_RULES).reduce<Record<string, { label: string; amount: number }>>(
          (acc, r) => ({ ...acc, ...r }),
          {}
        )
      : DISCOUNT_RULES[selectedOperator] || {};

  return (
    <div className="config-layout">
      <ThemeToggle />
      {/* Left sidebar */}
      <aside className="config-sidebar">
        <OperatorSelector />
        <div className="category-tabs">
          <div className="cat-tabs-label">Categoria</div>
          <button
            type="button"
            className={`cat-tab ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => selectCategory("all")}
          >
            Tutte
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              type="button"
              className={`cat-tab ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => selectCategory(cat.name)}
            >
              <span className="cat-tab-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main grid */}
      <main className="config-main">
        <div className="config-main-header">
          <h1>
            {selectedOperator === "all"
              ? "Tutti gli operatori"
              : selectedOperator.charAt(0).toUpperCase() + selectedOperator.slice(1)}{" "}
            — {selectedCategory === "all" ? "Tutte le categorie" : selectedCategory}
          </h1>
          <span className="offer-count">{filtered.length} offerte</span>
        </div>
        <div className="offer-grid">
          {filtered.map((offer) => {
            const cartItem = cart.find((i) => i.offer.id === offer.id);
            return (
              <OfferCard
                key={offer.id}
                offer={offer}
                qty={cartItem?.qty || 0}
                rules={rules}
                onAdd={() => addToCart(offer)}
                onRemove={() => removeFromCart(offer.id)}
              />
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Nessuna offerta trovata per questa selezione</p>
          </div>
        )}
      </main>

      {/* Right sidebar — cart */}
      <div className="cart-sidebar-wrap">
        <CartSidebar
          items={cart}
          discountLines={discountLines()}
          total={total()}
          operatorId={selectedOperator}
          onReset={clearCart}
        />
      </div>

      {/* Comparison modal */}
      {comparisonIds.length >= 2 && <ComparisonModal />}
    </div>
  );
}