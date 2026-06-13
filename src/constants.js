export const C = {
  cream:      "#F7F4EF",
  parchment:  "#EDE9E1",
  linen:      "#E2DDD5",
  ink:        "#1A1814",
  charcoal:   "#3D3A35",
  dust:       "#6F6A62",
  rule:       "#D4CFC7",
  cobalt:     "#2D46B9",
  cobaltDim:  "#1F3490",
  cobaltTint: "#EEF1FB",
  error:      "#9A2F2F",
  page:       "#FCFBF8",
  cardBg:     "#FFFFFF",
  cardEdge:   "#E4DFD6",
  rowLine:    "#EFEBE3",
};

export const GRID_IMAGES = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=70",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=70",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=70",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=70",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&q=70",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=70",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=70",
  "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&q=70",
];

export const AUTHOR_CHIPS = [
  "Emily Dickinson", "William Shakespeare", "William Wordsworth",
  "John Keats", "William Blake", "Walt Whitman", "Christina Rossetti",
  "Edgar Allan Poe",
];

export const PAGE_SIZE = 15;

export const label = (overrides = {}) => ({
  fontFamily: "Inter, sans-serif", fontWeight: 600, textTransform: "uppercase",
  letterSpacing: "0.18em", fontSize: 11, ...overrides,
});

