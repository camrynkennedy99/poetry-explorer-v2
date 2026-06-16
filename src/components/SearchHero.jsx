import { useState, useRef } from "react";
import { C, label, AUTHOR_CHIPS } from "../constants";

function Chip({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 100, padding: "7px 15px",
        border: `1.5px solid ${hov ? C.cobalt : C.rule}`,
        background: hov ? C.cobaltTint : "transparent",
        color: hov ? C.cobaltDim : C.charcoal,
        fontSize: 12.5, fontFamily: "Inter, sans-serif", fontWeight: 400,
      }}
    >
      {children}
    </button>
  );
}

export default function SearchHero({ searchType, setSearchType, query, setQuery, onSubmit, onChip, loading, compact }) {
  const inputRef = useRef(null);

  const handleToggle = (t) => { // preserve focus
    const wasFocused = document.activeElement === inputRef.current;
    setSearchType(t);
    if (wasFocused) inputRef.current?.focus();
  };

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        background: `
          radial-gradient(120% 90% at 50% -10%, ${C.cobaltTint} 0%, rgba(238,241,251,0) 55%),
          radial-gradient(80% 60% at 50% 0%, rgba(45,70,185,0.05) 0%, rgba(45,70,185,0) 60%),
          linear-gradient(180deg, ${C.cream} 0%, ${C.parchment} 100%)
        `,
        borderBottom: `1px solid ${C.rule}`,
        position: "relative", overflow: "hidden",
        // responsive padding
        padding: compact
          ? "32px clamp(20px, 5vw, 48px) 28px"
          : "clamp(48px, 8vh, 88px) clamp(20px, 5vw, 48px) 48px",
        textAlign: "center", transition: "padding 0.3s",
      }}
    >
      {!compact && (
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(180deg, rgba(26,24,20,0.018) 0px, rgba(26,24,20,0.018) 1px, transparent 1px, transparent 38px)`,
          maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)",
        }} />
      )}
      <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {!compact && (
          <>
            <p style={{ ...label(), color: C.cobalt, marginBottom: 18 }}>Where the right words find you</p>
            <h1 id="hero-heading" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 500,
              lineHeight: 1.05, letterSpacing: "-0.02em", color: C.ink, marginBottom: 14,
            }}>
              Your favorite poem is<br />waiting to be found.
            </h1>
            <p style={{
              fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 16,
              color: C.charcoal, marginBottom: 36,
            }}>
              Search thousands of poems from a vast archive of classic verse — by title or by author.
            </p>
          </>
        )}
        {compact && <h1 id="hero-heading" className="visually-hidden">Search poems</h1>}

        <form role="search" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <label htmlFor="poem-search" className="visually-hidden">Search poems by {searchType}</label>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#fff", borderRadius: 9999,
            padding: "8px 16px 8px 6px",
            boxShadow: "0 8px 40px rgba(45,70,185,0.13), 0 2px 8px rgba(26,24,20,0.07)",
            textAlign: "left",
          }}>
            <button
              type="button"
              onClick={() => handleToggle(searchType === "title" ? "author" : "title")}
              aria-label={`Search by ${searchType} — click to switch`}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", padding: "0 4px 0 12px",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              <span className="search-toggle-label" style={{ ...label({ fontSize: 10, letterSpacing: "0.14em" }), color: C.cobalt }}>
                By {searchType}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={C.cobalt} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="2 4 6 8 10 4"/>
              </svg>
            </button>
            <div style={{ width: 1, height: 28, background: C.rule, flexShrink: 0 }} aria-hidden="true" />
            <div className="search-pill-inner" style={{
              flex: 1, display: "flex", alignItems: "center", gap: 10,
              border: `1.5px solid #BFCEF7`,
              borderRadius: 9999, background: "#fff",
              padding: "10px 16px", minWidth: 0,
              marginLeft: 32,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.cobalt} strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.7 }}>
                <circle cx="6.5" cy="6.5" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
              </svg>
              <input
                id="poem-search" ref={inputRef} type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchType === "title" ? '"Ozymandias" or "Hope"' : '"Emily Dickinson"'}
                autoComplete="off"
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontSize: 15, fontFamily: "Inter, sans-serif", fontWeight: 300,
                  color: C.ink, caretColor: C.cobalt, minWidth: 0,
                }}
              />
            </div>
            <button
              type="submit" disabled={loading}
              aria-label="Search"
              className="search-submit"
              style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: 13, marginRight: 2,
                background: loading
                  ? C.cobaltDim
                  : `linear-gradient(135deg, #4B68D4 0%, ${C.cobalt} 55%, ${C.cobaltDim} 100%)`,
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.18s, transform 0.1s",
                boxShadow: "0 3px 12px rgba(45,70,185,0.35)",
              }}
            >
              {loading
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ animation: "spin 1s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                : <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>
              }
            </button>
          </div>
        </form>

        <div className="chip-row" style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ ...label({ fontWeight: 400, fontSize: 11 }), color: C.dust, marginRight: 4 }}>
            Browse an author:
          </span>
          {AUTHOR_CHIPS.map((a) => (
            <Chip key={a} onClick={() => onChip(a)}>{a}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
