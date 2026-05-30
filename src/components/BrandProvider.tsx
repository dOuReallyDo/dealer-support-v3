"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { OperatorId } from "@/types";
import { OPERATORS_MAP } from "@/data/operators";

interface BrandContextValue {
  brand: OperatorId | "all";
  setBrand: (id: OperatorId | "all") => void;
}

const BrandContext = createContext<BrandContextValue>({
  brand: "all",
  setBrand: () => {},
});

export const useBrand = () => useContext(BrandContext);

/* Cache loaded stylesheets to avoid duplicate <link> tags */
const loadedSheets = new Set<string>();

function loadBrandCSS(operatorId: OperatorId) {
  const op = OPERATORS_MAP[operatorId as keyof typeof OPERATORS_MAP];
  if (!op) return;
  const href = op.cssFile;
  if (loadedSheets.has(href)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.brand = operatorId;
  document.head.appendChild(link);
  loadedSheets.add(href);
}

export default function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandInternal] = useState<OperatorId | "all">("all");

  const setBrand = useCallback((id: OperatorId | "all") => {
    setBrandInternal(id);
  }, []);

  useEffect(() => {
    /* Remove old brand classes from body */
    document.body.classList.remove(
      "brand-windtre", "brand-tim", "brand-vodafone", "brand-fastweb", "brand-iliad", "brand-all"
    );

    if (brand === "all") {
      document.body.classList.add("brand-all");
      /* Preload all brand CSS files */
      const ids: OperatorId[] = ["windtre", "tim", "vodafone", "fastweb", "iliad"];
      ids.forEach(loadBrandCSS);
    } else {
      document.body.classList.add(`brand-${brand}`);
      loadBrandCSS(brand);
    }
  }, [brand]);

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
}