import { useState, useEffect, useRef } from "react";
import { C, label } from "../constants";
import { ChevronIcon, SurpriseIcon, SearchIcon, HeartIcon } from "./Icons";
import { RailCard, CardRow } from "./RailCard";
import FavBtn from "./FavBtn";
import { poemKey } from "./FavBtn";
import PillBtn from "./PillBtn";

const BackIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="14" y1="8" x2="2" y2="8"/><polyline points="7 13 2 8 7 3"/>
  </svg>
);

export default function ReadingView({ poem, onClose, isFav, onToggleFav, favorites, onRandom, onAuthor, onOpen }) {
  const headingRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const otherFavs = favorites.filter((f) => poemKey(f) !== poemKey(poem));

  useEffect(() => {
    headingRef.current?.focus?.();
    window.scrollTo({ top: 0, behavior: "auto" });
    const onKey = (e) => e.key === "Escape" && onClose();
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [poem, onClose]);

  const bgLightness = Math.round(252 - scrollPct * 18);
  const bgColor = `rgb(${bgLightness}, ${Math.round(bgLightness * 0.992)}, ${Math.round(bgLightness * 0.973)})`;

  return (
    <div style={{ background: bgColor, minHeight: "60vh", transition: "background 0.3s" }}>
      <div style={{
        borderBottom: `1px solid ${C.rule}`, background: C.cream,
        padding: "12px clamp(20px, 5vw, 48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
      }}>
        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", ...label({ fontWeight: 500, fontSize: 11 }), color: C.cobalt, padding: 4 }}
          >
            Poems
          </button>
          <span aria-hidden="true" style={{ color: C.rule }}><ChevronIcon size={12} /></span>
          <span style={{
            ...label({ fontWeight: 400, fontSize: 11 }), color: C.dust,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "50vw",
          }}>
            {poem.title}
          </span>
        </nav>
        <PillBtn variant="ghost" small onClick={onClose}>
          <BackIcon /> Back to poems
        </PillBtn>
      </div>

      <div className="reading-grid">
        <article>
          <p style={{ ...label({ fontSize: 11, letterSpacing: "0.2em" }), color: C.cobalt, marginBottom: 16 }}>
            From the archive
          </p>
          <h2
            ref={headingRef} tabIndex={-1}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(30px, 4.4vw, 54px)", fontWeight: 500, lineHeight: 1.05,
              color: C.ink, letterSpacing: "-0.02em", outline: "none",
            }}
          >
            {poem.title}
          </h2>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
            fontSize: "clamp(16px, 1.8vw, 20px)", color: C.cobaltDim, marginTop: 14,
          }}>
            by {poem.author}
          </p>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
            <FavBtn poem={poem} isFav={isFav} onToggle={onToggleFav} size={40} />
          </div>
          <div style={{ height: 1, background: C.rule, margin: "14px 0 40px" }} />
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.85,
            color: C.charcoal, fontWeight: 400, maxWidth: "60ch",
          }}>
            {poem.lines?.map((line, i) => (
              <div key={i} style={{ minHeight: "1.1em" }}>
                {line.trim() === "" ? " " : line}
              </div>
            ))}
          </div>
        </article>

        <aside className="reading-rail" style={{
          position: "sticky", top: 84,
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          <RailCard title="Keep exploring" bodyPad="0">
            <CardRow
              icon={<SurpriseIcon size={15} />}
              title="Surprise me" sub="A poem picked at random"
              onClick={onRandom}
            />
            <CardRow
              icon={<SearchIcon size={15} />}
              title={`More from ${poem.author}`} sub="Browse this poet's work"
              onClick={() => onAuthor(poem.author)}
              last
            />
          </RailCard>

          {otherFavs.length > 0 && (
            <RailCard title="Your favorites" icon={<HeartIcon filled size={12} />} bodyPad="0">
              {otherFavs.slice(0, 5).map((p, i, arr) => (
                <CardRow
                  key={poemKey(p)}
                  title={p.title} sub={p.author}
                  onClick={() => onOpen(p)}
                  last={i === arr.length - 1}
                />
              ))}
            </RailCard>
          )}

          <RailCard title="About this poem" bodyPad="6px 20px 18px">
            <dl style={{ margin: 0 }}>
              {[["Author", poem.author], ["Lines", String(poem.linecount)], ["Source", "PoetryDB"]].map(([k, v], i, arr) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline",
                  padding: "12px 0", borderBottom: i === arr.length - 1 ? "none" : `1px solid ${C.rowLine}`,
                }}>
                  <dt style={{ ...label({ fontSize: 10, fontWeight: 500, letterSpacing: "0.14em" }), color: C.dust }}>{k}</dt>
                  <dd style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14, color: C.ink, margin: 0, textAlign: "right" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </RailCard>
        </aside>
      </div>
    </div>
  );
}
