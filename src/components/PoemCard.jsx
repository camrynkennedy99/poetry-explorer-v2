import { useState } from "react";
import { C, GRID_IMAGES, label } from "../constants";
import FavBtn from "./FavBtn";

export default function PoemCard({ poem, index, onOpen, isFav, onToggleFav }) {
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgSrc = GRID_IMAGES[index % GRID_IMAGES.length];
  const firstLine = poem.lines?.find((l) => l.trim()) || "";
  const isWide = index === 0;

  return (
    <article
      onClick={() => onOpen(poem)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: isWide ? "1 / -1" : "span 1",
        background: C.cream,
        border: `1px solid ${hov ? C.cobalt : C.rule}`,
        cursor: "pointer", overflow: "hidden",
        display: "flex", flexDirection: isWide ? "row" : "column",
        boxShadow: hov ? "0 8px 32px rgba(45,70,185,0.10)" : "0 1px 4px rgba(26,24,20,0.05)",
        transition: "all 0.18s", borderRadius: 4,
      }}
    >
      <div style={{
        position: "relative", overflow: "hidden", flexShrink: 0,
        height: isWide ? "auto" : 150, width: isWide ? "38%" : "100%", minHeight: isWide ? 220 : undefined,
      }}>
        <img
          src={imgSrc} onLoad={() => setImgLoaded(true)} alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: imgLoaded ? 1 : 0, transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease, opacity 0.4s",
            filter: "saturate(0.5) brightness(1.05)", position: "absolute", inset: 0,
          }}
        />
        {isWide && (
          <span style={{
            position: "absolute", top: 16, left: 16,
            ...label({ fontSize: 10, letterSpacing: "0.18em" }),
            background: C.cobalt, color: "#fff", padding: "5px 12px", borderRadius: 100,
          }}>
            Featured
          </span>
        )}
      </div>
      <div style={{ padding: isWide ? "28px 32px" : "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          margin: 0,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: isWide ? "clamp(22px, 2.4vw, 30px)" : "clamp(16px, 1.5vw, 19px)",
          fontWeight: 500, lineHeight: 1.2, color: C.ink, letterSpacing: "-0.01em",
        }}>
          {poem.title}
        </h3>
        <p style={{ ...label({ fontSize: 11, letterSpacing: "0.14em" }), color: C.cobaltDim, margin: "8px 0 10px" }}>
          {poem.author}
        </p>
        {firstLine && (
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isWide ? 16 : 13.5, color: C.charcoal, fontStyle: "italic",
            lineHeight: 1.6, margin: 0, flex: 1,
          }}>
            {firstLine}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <span style={{ ...label({ fontWeight: 400, fontSize: 11, letterSpacing: "0.1em" }), color: C.dust }}>
            {poem.linecount} lines
          </span>
          <FavBtn poem={poem} isFav={isFav} onToggle={onToggleFav} />
        </div>
      </div>
    </article>
  );
}
