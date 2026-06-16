import { C } from "../constants";
import PillBtn from "./PillBtn";
import { BackIcon } from "./Icons";

// v2
export default function Pagination({ page, totalPages, onChange }) {
  const go = (n) => {
    onChange(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageBtn = (n) => (
    <button
      key={n}
      onClick={() => go(n)}
      style={{
        width: 36, height: 36, borderRadius: 100, border: "none",
        background: n === page ? C.cobalt : "transparent",
        color: n === page ? "#fff" : C.charcoal,
        fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
        cursor: "pointer",
      }}
    >
      {n}
    </button>
  );

  const dots = (key) => (
    <span key={key} style={{ color: C.dust, fontFamily: "Inter, sans-serif", fontSize: 13, padding: "0 4px" }}>…</span>
  );

  const buildPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => pageBtn(i + 1));
    const nearby = new Set(
      [1, totalPages, page, page - 1, page + 1, page - 2, page + 2].filter(n => n >= 1 && n <= totalPages)
    );
    const sorted = [...nearby].sort((a, b) => a - b);
    return sorted.reduce((acc, n, i) => {
      if (i > 0 && n - sorted[i - 1] > 1) acc.push(dots(`dots-${n}`));
      acc.push(pageBtn(n));
      return acc;
    }, []);
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 6, padding: "32px clamp(20px, 5vw, 48px)",
      borderTop: `1px solid ${C.rule}`,
    }}>
      <PillBtn
        variant="ghost" small
        onClick={() => go(page - 1)}
        disabled={page === 1}
        style={{ opacity: page === 1 ? 0.35 : 1 }}
      >
        <BackIcon /> Prev
      </PillBtn>
      {buildPages()}
      <PillBtn
        variant="ghost" small
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        style={{ opacity: page === totalPages ? 0.35 : 1 }}
      >
        Next <BackIcon />
      </PillBtn>
    </div>
  );
}
