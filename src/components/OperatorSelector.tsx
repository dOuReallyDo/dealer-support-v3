"use client";

import { useBrand } from "./BrandProvider";
import { useConfigStore } from "@/store/configurator";
import { OPERATORS } from "@/data/operators";
import type { OperatorId } from "@/types";

export default function OperatorSelector() {
  const { brand, setBrand } = useBrand();
  const selectOperator = useConfigStore((s) => s.selectOperator);

  function handleSelect(id: OperatorId | "all") {
    setBrand(id);
    selectOperator(id);
  }

  return (
    <div className="operator-selector">
      <div className="op-selector-label">Operatore</div>
      <div className="op-buttons">
        <button
          type="button"
          className={`op-btn ${brand === "all" ? "active" : ""}`}
          onClick={() => handleSelect("all")}
          data-operator="all"
        >
          <span className="op-btn-icon">🌐</span>
          <span className="op-btn-name">Tutti</span>
        </button>
        {OPERATORS.map((op) => (
          <button
            key={op.id}
            type="button"
            className={`op-btn ${brand === op.id ? "active" : ""}`}
            onClick={() => handleSelect(op.id)}
            data-operator={op.id}
            style={{ "--op-color": op.brandColor } as React.CSSProperties}
          >
            <span
              className="op-btn-dot"
              style={{ backgroundColor: op.brandColor }}
            />
            <span className="op-btn-name">{op.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}