/* ==========================================================================
   Dealer Support v3 — Core Types
   ========================================================================== */

/** Supported operators */
export type OperatorId = 'windtre' | 'tim' | 'vodafone' | 'fastweb' | 'iliad';

/** Operator metadata */
export interface Operator {
  id: OperatorId;
  name: string;
  displayName: string;
  cssFile: string;
  logoFile: string;
  brandColor: string;
  brandColorLight: string;
  prefix: string;       // CSS variable prefix e.g. --wt-, --tim-, --voda-
  cssClass: string;     // operator-specific CSS class prefix e.g. wt, tim, voda
}

/** Offer categories */
export type OfferCategory = 'Mobile' | 'Fissa' | 'Energia' | 'Assicurazioni' | 'Smartphone';

/** Category icon mapping */
export interface CategoryMeta {
  name: OfferCategory;
  icon: string;
  order: number;
}

/** Single offer/product */
export interface Offer {
  id: string;
  operatorId: OperatorId;
  category: OfferCategory;
  name: string;
  subtitle: string;
  basePrice: number;
  price: number;
  billing: string;
  features: string;   // pipe-separated
  rules: string;       // rule key or empty
  promoPrice?: number;
  promoLabel?: string;
  active: boolean;
  sort: number;
}

/** Discount rule */
export interface DiscountRule {
  label: string;
  amount: number;
}

/** Cart item */
export interface CartItem {
  offer: Offer;
  qty: number;
}

/** Discount line */
export interface DiscountLine {
  label: string;
  amount: number;
}

/** Cart summary */
export interface CartSummary {
  items: CartItem[];
  discountLines: DiscountLine[];
  subtotal: number;
  discount: number;
  total: number;
}

/** Comparison item */
export interface ComparisonItem {
  offer: Offer;
  selected: boolean;
}

/** Dealer auth */
export interface Dealer {
  email: string;
  pdv_code: string;
}