import { useState } from "react";
import { C } from "../constants";

export default function PillBtn({ children, onClick, variant = "solid", small = false, style = {}, ...rest }) {
  const [hov, setHov] = useState(false);
  const base = {
    borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 8,
    fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
    fontSize: small ? 11 : 12, padding: small ? "9px 18px" : "13px 26px",
    border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif",
    transition: "all 0.18s",
  };
  const variants = {
    solid: { background: hov ? C.cobaltDim : C.cobalt, color: "#fff" },
    ghost: {
      background: hov ? C.cobaltTint : "transparent",
      border: `1.5px solid ${hov ? C.cobalt : C.rule}`,
      color: hov ? C.cobaltDim : C.charcoal,
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
