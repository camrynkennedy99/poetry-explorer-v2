import { useState, useEffect } from "react";
import { C, label } from "../constants";
import { SurpriseIcon, HeartIcon } from "./Icons";
import PillBtn from "./PillBtn";

export default function Header({ view, onHome, onFavorites, onRandom, favCount }) {
  const isReading = view === "reading";
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!isReading) return;
    setRevealed(false);
    const onMove = (e) => setRevealed(e.clientY < 60);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isReading]);

  return (
    <header style={{
      background: C.cream,
      borderBottom: `1px solid ${isReading && !revealed ? "transparent" : C.rule}`,
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px clamp(20px, 5vw, 48px)",
      opacity: isReading ? (revealed ? 1 : 0) : 1,
      transition: "opacity 0.3s ease-in-out, border-color 0.3s ease-in-out",
      pointerEvents: isReading && !revealed ? "none" : "auto",
    }}>
      <button
        onClick={onHome}
        style={{ background: "none", border: "none", display: "flex", alignItems: "baseline", gap: 10, padding: 4 }}
        aria-label="Poetry Explorer — home"
      >
        <span style={{ ...label({ fontSize: 14, letterSpacing: "0.14em" }), color: C.ink }}>
          <span style={{ color: C.cobalt }}>Poetry</span> Explorer
        </span>
      </button>
      <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PillBtn variant="ghost" small onClick={onRandom} aria-label="Surprise me — random poem">
          <SurpriseIcon /> <span className="nav-label">Surprise me</span>
        </PillBtn>
        <PillBtn
          variant={view === "favorites" ? "solid" : "ghost"} small
          onClick={onFavorites}
          aria-label={`Favorites, ${favCount} saved`}
        >
          <HeartIcon filled={favCount > 0} size={13} />
          <span className="nav-label">Favorites{favCount > 0 ? ` · ${favCount}` : ""}</span>
        </PillBtn>
      </nav>
    </header>
  );
}
