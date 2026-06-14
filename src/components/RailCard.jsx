import { useState } from "react";
import { C, label } from "../constants";
import { ChevronIcon } from "./Icons";

export function RailCard({ title, icon, children, bodyPad = "0" }) {
  return (
    <section style={{
      background: C.cardBg, border: `1px solid ${C.cardEdge}`,
      borderRadius: 12, overflow: "hidden",
      boxShadow: "0 1px 3px rgba(26,24,20,0.04)",
    }}>
      {title && (
        <div style={{
          padding: "15px 20px", borderBottom: `1px solid ${C.rowLine}`,
          display: "flex", alignItems: "center", gap: 9,
        }}>
          {icon && <span style={{ color: C.cobalt, display: "inline-flex" }}>{icon}</span>}
          <h3 style={{ ...label({ fontSize: 11, letterSpacing: "0.16em" }), color: C.charcoal, margin: 0 }}>
            {title}
          </h3>
        </div>
      )}
      <div style={{ padding: bodyPad }}>{children}</div>
    </section>
  );
}

export function CardRow({ icon, title, sub, onClick, last }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 13, textAlign: "left", width: "100%",
        background: hov ? C.cobaltTint : "transparent", border: "none",
        borderBottom: last ? "none" : `1px solid ${C.rowLine}`,
        padding: "14px 20px",
      }}
    >
      {icon && (
        <span style={{
          flexShrink: 0, width: 34, height: 34, borderRadius: 9,
          background: hov ? C.cobalt : C.cobaltTint, color: hov ? "#fff" : C.cobalt,
          display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s",
        }}>
          {icon}
        </span>
      )}
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{
          display: "block", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14.5,
          color: C.ink, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {title}
        </span>
        {sub && (
          <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 12.5, color: C.dust, marginTop: 2 }}>
            {sub}
          </span>
        )}
      </span>
      <span style={{ color: hov ? C.cobalt : C.rule, flexShrink: 0, transform: hov ? "translateX(2px)" : "none", transition: "all 0.18s" }}>
        <ChevronIcon />
      </span>
    </button>
  );
}
