import { useState, useCallback } from "react";
import { poemKey } from "../components/FavBtn";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const isFav = useCallback(
    (p) => favorites.some((f) => poemKey(f) === poemKey(p)),
    [favorites]
  );

  const toggleFav = useCallback((p) => {
    setFavorites((favs) =>
      favs.some((f) => poemKey(f) === poemKey(p))
        ? favs.filter((f) => poemKey(f) !== poemKey(p))
        : [...favs, p]
    );
  }, []);

  return { favorites, isFav, toggleFav };
}
