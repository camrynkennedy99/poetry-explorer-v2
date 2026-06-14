import { useState } from "react";
import { C, label } from "../constants";
import FavBtn from "./FavBtn";

export default function ResultRow({ poem, index, onOpen, isFav, onToggleFav }) {
  const [hov, setHov] = useState(false);
  const firstLine = poem.lines?.find((l) => l.trim()) || "";

  return (
    <li
      onClick={() => onOpen(poem)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "grid", gridTemplateColumns: "44px 1fr auto", gap: "0 20px",
        alignItems: "center", listStyle: "none",
        padding: "22px clamp(20px, 5vw, 48px)",
        borderBottom: `1px solid ${C.rule}`,
        borderLeft: `3px solid ${hov ? C.cobalt : "transparent"}`,
        background: hov ? C.cobaltTint : "transparent",
        cursor: "pointer", transition: "all 0.13s",
      }}
    >
      <span aria-hidden="true" style={{ ...label({ fontWeight: 500, fontSize: 12, letterSpacing: "0.1em" }), color: hov ? C.cobalt : C.dust }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 style={{
          margin: 0, lineHeight: 1.25,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(17px, 1.7vw, 22px)", fontWeight: 500,
          color: C.ink, letterSpacing: "-0.01em",
        }}>
          {poem.title}
        </h3>
        <p style={{ ...label({ fontSize: 11, letterSpacing: "0.14em" }), color: C.cobaltDim, margin: "5px 0 7px" }}>
          {poem.author}
        </p>
        {firstLine && (
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, color: C.charcoal, fontStyle: "italic", margin: 0 }}>
            {firstLine}
          </p>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ ...label({ fontWeight: 400, fontSize: 11, letterSpacing: "0.1em" }), color: C.dust, whiteSpace: "nowrap" }}>
          {poem.linecount} lines
        </span>
        <FavBtn poem={poem} isFav={isFav} onToggle={onToggleFav} />
      </div>
    </li>
  );
}
