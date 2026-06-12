import { useState, useCallback } from "react";
import { C, PAGE_SIZE, label } from "./constants";
import { CloseIcon } from "./components/Icons";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import SearchHero from "./components/SearchHero";
import ReadingView from "./components/ReadingView";
import ResultRow from "./components/ResultRow";
import PoemCard from "./components/PoemCard";
import PillBtn from "./components/PillBtn";
import useFavorites from "./hooks/useFavorites";
import usePoetrySearch from "./hooks/usePoetrySearch";
import { poemKey } from "./components/FavBtn";

export default function App() {
  const [view, setView] = useState("home");
  const [searchType, setSearchType] = useState("title");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [prevView, setPrevView] = useState("home");
  const [page, setPage] = useState(1);

  const { favorites, isFav, toggleFav } = useFavorites();
  const { results, status, resultLabel, browse, runSearch, fetchRandom, setStatus, setResults } = usePoetrySearch();

  const openPoem = useCallback((p) => {
    setSelected(p);
    setView((v) => { if (v !== "reading") setPrevView(v); return "reading"; });
  }, []);

  const closePoem = useCallback(() => {
    setSelected(null);
    setView(prevView);
  }, [prevView]);

  const search = useCallback(() => {
    setPage(1);
    setView("results");
    runSearch(searchType, query, `${searchType === "title" ? "Titles" : "Authors"} matching "${query.trim()}"`);
  }, [runSearch, searchType, query]);

  const searchAuthor = useCallback((author) => {
    setSearchType("author");
    setQuery(author);
    setPage(1);
    setView("results");
    runSearch("author", author, `Poems by ${author}`);
  }, [runSearch]);

  const handleRandom = useCallback(() => {
    setSelected(null);
    setPage(1);
    setView("results");
    fetchRandom();
  }, [fetchRandom]);

  const goHome = useCallback(() => {
    setSelected(null);
    setPage(1);
    setView("home");
    setStatus("idle");
    setResults([]);
    setQuery("");
  }, [setStatus, setResults]);

  const goFavorites = useCallback(() => {
    setSelected(null);
    setView((v) => (v === "favorites" ? "home" : "favorites"));
  }, []);

  const totalPages  = Math.ceil(results.length / PAGE_SIZE);
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusMessage =
    status === "loading" ? "Searching the archive…"
    : status === "done"  ? `${results.length} poem${results.length !== 1 ? "s" : ""} found`
    : status === "error" ? "Something went wrong"
    : "";

  const showHero = view === "home" || view === "results";

  return (
    <div style={{ background: C.linen, minHeight: "100vh", color: C.ink }}>
      <a href="#main" className="skip-link">Skip to content</a>

      <Header
        view={view}
        onHome={goHome}
        onFavorites={goFavorites}
        onRandom={handleRandom}
        favCount={favorites.length}
      />

      {showHero && (
        <SearchHero
          searchType={searchType} setSearchType={setSearchType}
          query={query} setQuery={setQuery}
          onSubmit={search} onChip={searchAuthor}
          loading={status === "loading"}
          compact={view === "results"}
        />
      )}

      <main id="main">
        {view === "reading" && selected && (
          <ReadingView
            poem={selected}
            onClose={closePoem}
            isFav={isFav(selected)}
            onToggleFav={toggleFav}
            favorites={favorites}
            onRandom={handleRandom}
            onAuthor={searchAuthor}
            onOpen={openPoem}
          />
        )}

        {view === "results" && (
          <>
            <div aria-live="polite">
              <div style={{
                padding: "18px clamp(20px, 5vw, 48px)",
                borderBottom: `1px solid ${C.rule}`, background: C.parchment,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
              }}>
                <span style={{ ...label(), color: C.charcoal }}>
                  {resultLabel} — {statusMessage}
                </span>
                <button
                  onClick={goHome}
                  style={{
                    background: "none", border: "none", color: C.dust,
                    ...label({ fontWeight: 500, fontSize: 11 }),
                    display: "flex", alignItems: "center", gap: 6, padding: 4,
                  }}
                >
                  <CloseIcon /> Clear
                </button>
              </div>
            </div>

            {status === "loading" && (
              <p style={{ padding: "44px clamp(20px, 5vw, 48px)", ...label({ fontWeight: 400 }), color: C.dust }}>
                Retrieving poems…
              </p>
            )}
            {status === "error" && (
              <div style={{ padding: "44px clamp(20px, 5vw, 48px)" }}>
                <p style={{ ...label(), color: C.error, marginBottom: 10 }}>Connection error</p>
                <p style={{ fontSize: 15, color: C.charcoal, fontFamily: "Inter, sans-serif", fontWeight: 300, marginBottom: 20 }}>
                  Could not reach PoetryDB. Check your connection and try again.
                </p>
                <PillBtn variant="ghost" small onClick={search}>Retry</PillBtn>
              </div>
            )}
            {status === "done" && results.length === 0 && (
              <div style={{ padding: "56px clamp(20px, 5vw, 48px)" }}>
                <p style={{ ...label(), color: C.cobalt, marginBottom: 12 }}>No results</p>
                <p style={{ fontSize: 15, color: C.charcoal, fontFamily: "Inter, sans-serif", fontWeight: 300 }}>
                  Nothing matched that {searchType}. Try a shorter fragment or browse one of the authors above.
                </p>
              </div>
            )}
            {status === "done" && results.length > 0 && (
              <>
                <ul style={{ margin: 0, padding: 0 }}>
                  {pageResults.map((poem, i) => (
                    <ResultRow
                      key={poemKey(poem)} poem={poem} index={(page - 1) * PAGE_SIZE + i}
                      onOpen={openPoem} isFav={isFav(poem)} onToggleFav={toggleFav}
                    />
                  ))}
                </ul>
                {totalPages > 1 && (
                  <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                )}
              </>
            )}
          </>
        )}

        {view === "favorites" && (
          <section aria-labelledby="fav-heading">
            <div style={{
              padding: "18px clamp(20px, 5vw, 48px)",
              borderBottom: `1px solid ${C.rule}`, background: C.parchment,
            }}>
              <h2 id="fav-heading" style={{ ...label(), color: C.charcoal, margin: 0 }}>
                Your favorites · {favorites.length}
              </h2>
            </div>
            {favorites.length === 0 ? (
              <div style={{ padding: "56px clamp(20px, 5vw, 48px)" }}>
                <p style={{ ...label(), color: C.cobalt, marginBottom: 12 }}>Nothing saved yet</p>
                <p style={{ fontSize: 15, color: C.charcoal, fontFamily: "Inter, sans-serif", fontWeight: 300, marginBottom: 24 }}>
                  Tap the heart on any poem to keep it here for this session.
                </p>
                <PillBtn variant="ghost" small onClick={goHome}><BackIcon /> Browse poems</PillBtn>
              </div>
            ) : (
              <ul style={{ margin: 0, padding: 0 }}>
                {favorites.map((poem, i) => (
                  <ResultRow
                    key={poemKey(poem)} poem={poem} index={i}
                    onOpen={openPoem} isFav={true} onToggleFav={toggleFav}
                  />
                ))}
              </ul>
            )}
          </section>
        )}

        {view === "home" && (
          <section aria-labelledby="browse-heading" style={{ padding: "0 0 64px" }}>
            <div style={{
              padding: "18px clamp(20px, 5vw, 48px)",
              borderBottom: `1px solid ${C.rule}`, background: C.parchment,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h2 id="browse-heading" style={{ ...label(), color: C.cobalt, margin: 0 }}>
                Fresh from the archive
              </h2>
              <span style={{ ...label({ fontWeight: 400 }), color: C.dust }}>Refreshes each visit</span>
            </div>
            {browse.length > 0 ? (
              <div style={{
                padding: "28px clamp(20px, 5vw, 48px) 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 20,
              }}>
                {browse.map((poem, i) => (
                  <PoemCard
                    key={poemKey(poem)} poem={poem} index={i}
                    onOpen={openPoem} isFav={isFav(poem)} onToggleFav={toggleFav}
                  />
                ))}
              </div>
            ) : (
              <p style={{ padding: "44px clamp(20px, 5vw, 48px)", ...label({ fontWeight: 400 }), color: C.dust }}>
                Loading poems…
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
