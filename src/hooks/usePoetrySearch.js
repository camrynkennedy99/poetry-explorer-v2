import { useState, useCallback, useRef, useEffect } from "react";
import { AUTHOR_CHIPS } from "../constants";

export default function usePoetrySearch() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [resultLabel, setResultLabel] = useState("");
  const [browse, setBrowse] = useState([]);
  const cache = useRef({});

  useEffect(() => {
    fetch("https://poetrydb.org/random/9")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setBrowse(d))
      .catch(() => {});

    AUTHOR_CHIPS.forEach((author, i) => {
      setTimeout(() => {
        const key = `author/${author}`;
        if (cache.current[key]) return;
        fetch(`https://poetrydb.org/author/${encodeURIComponent(author)}`)
          .then((r) => r.json())
          .then((d) => { if (Array.isArray(d)) cache.current[key] = d; })
          .catch(() => {});
      }, i * 400);
    });
  }, []);

  const runSearch = useCallback(async (field, value, labelText) => {
    if (!value.trim()) return;
    setStatus("loading");
    setResults([]);
    setResultLabel(labelText);

    const key = `${field}/${value.trim()}`;
    if (cache.current[key]) {
      setResults(cache.current[key]);
      setStatus("done");
      return;
    }

    try {
      const res = await fetch(`https://poetrydb.org/${field}/${encodeURIComponent(value.trim())}`);
      const data = await res.json();
      const poems = Array.isArray(data) ? data : [];
      cache.current[key] = poems;
      setResults(poems);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, []);

  const fetchRandom = useCallback(async (onReady) => {
    setStatus("loading");
    setResults([]);
    setResultLabel("A random selection");
    try {
      const res = await fetch("https://poetrydb.org/random/12");
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setStatus("done");
      onReady?.();
    } catch {
      setStatus("error");
    }
  }, []);

  return { results, status, resultLabel, browse, runSearch, fetchRandom, setStatus, setResults };
}
