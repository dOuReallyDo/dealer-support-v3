import { create } from 'zustand';
import type { OperatorId, OfferCategory, CartItem, Offer } from '@/types';
import { DISCOUNT_RULES, ALL_OFFERS } from '@/data/offers';
import type { DiscountLine } from '@/types';

interface ConfigState {
  /* Operator & category filter */
  selectedOperator: OperatorId | 'all';
  selectedCategory: OfferCategory | 'all';
  selectOperator: (id: OperatorId | 'all') => void;
  selectCategory: (cat: OfferCategory | 'all') => void;

  /* Cart */
  cart: CartItem[];
  addToCart: (offer: Offer) => void;
  removeFromCart: (offerId: string) => void;
  setCartQty: (offerId: string, qty: number) => void;
  clearCart: () => void;

  /* Computed: discounts */
  discountLines: () => DiscountLine[];
  subtotal: () => number;
  total: () => number;

  /* Comparison */
  comparisonIds: string[];
  toggleComparison: (offerId: string) => void;
  clearComparison: () => void;

  /* Dealer auth */
  dealer: { email: string; pdv_code: string } | null;
  setDealer: (d: { email: string; pdv_code: string } | null) => void;
}

function calcDiscounts(items: CartItem[]): DiscountLine[] {
  const lines: DiscountLine[] = [];
  /* Group by operator */
  const byOp: Record<string, CartItem[]> = {};
  for (const item of items) {
    (byOp[item.offer.operatorId] ??= []).push(item);
  }

  for (const [opId, opItems] of Object.entries(byOp)) {
    const rules = DISCOUNT_RULES[opId] || {};
    const hasMobile = opItems.some((i) => i.offer.category === 'Mobile' && i.qty > 0);
    const hasFissa = opItems.some((i) => i.offer.category === 'Fissa' && i.qty > 0);
    const hasEnergia = opItems.some((i) => i.offer.category === 'Energia' && i.qty > 0);

    /* Fixed + mobile discount */
    if (hasMobile && hasFissa && rules['fixed_mobile_discount']) {
      const r = rules['fixed_mobile_discount'];
      if (r.amount > 0) lines.push({ label: r.label, amount: -r.amount });
    }

    /* Energy discount if mobile or fissa also present */
    if (hasEnergia && (hasMobile || hasFissa) && rules['energy_discount']) {
      const r = rules['energy_discount'];
      if (r.amount > 0) lines.push({ label: r.label, amount: -r.amount });
    }
    if (hasEnergia && (hasMobile || hasFissa) && rules['energy_w3_discount']) {
      const r = rules['energy_w3_discount'];
      if (r.amount > 0) lines.push({ label: r.label, amount: -r.amount });
    }
  }
  return lines;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  selectedOperator: 'all',
  selectedCategory: 'Mobile',
  selectOperator: (id) => set({ selectedOperator: id }),
  selectCategory: (cat) => set({ selectedCategory: cat }),

  cart: [],
  addToCart: (offer) => {
    const { cart } = get();
    const existing = cart.find((i) => i.offer.id === offer.id);
    if (existing) {
      set({
        cart: cart.map((i) =>
          i.offer.id === offer.id ? { ...i, qty: i.qty + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { offer, qty: 1 }] });
    }
  },
  removeFromCart: (offerId) => {
    const { cart } = get();
    const existing = cart.find((i) => i.offer.id === offerId);
    if (existing && existing.qty > 1) {
      set({
        cart: cart.map((i) =>
          i.offer.id === offerId ? { ...i, qty: i.qty - 1 } : i
        ),
      });
    } else {
      set({ cart: cart.filter((i) => i.offer.id !== offerId) });
    }
  },
  setCartQty: (offerId, qty) => {
    const { cart } = get();
    if (qty <= 0) {
      set({ cart: cart.filter((i) => i.offer.id !== offerId) });
    } else {
      set({
        cart: cart.map((i) =>
          i.offer.id === offerId ? { ...i, qty } : i
        ),
      });
    }
  },
  clearCart: () => set({ cart: [] }),

  discountLines: () => calcDiscounts(get().cart),
  subtotal: () => get().cart.reduce((s, i) => s + i.offer.price * i.qty, 0),
  total: () => {
    const sub = get().subtotal();
    const discs = get().discountLines();
    const disc = discs.reduce((s, d) => s + d.amount, 0);
    return Math.max(0, sub + disc);
  },

  comparisonIds: [],
  toggleComparison: (offerId) => {
    const { comparisonIds } = get();
    if (comparisonIds.includes(offerId)) {
      set({ comparisonIds: comparisonIds.filter((id) => id !== offerId) });
    } else if (comparisonIds.length < 3) {
      set({ comparisonIds: [...comparisonIds, offerId] });
    }
  },
  clearComparison: () => set({ comparisonIds: [] }),

  dealer: null,
  setDealer: (d) => set({ dealer: d }),
}));