import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HeartIcon } from "./Icons";
import { C } from "../constants";

export const poemKey = (p) => `${p.title}__${p.author}`;

export default function FavBtn({ poem, isFav, onToggle, size = 36 }) {
  const [hov, setHov] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onToggle(poem);
    toast(isFav ? `Removed "${poem.title}"` : `Saved "${poem.title}"`, {
      icon: (
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 20, height: 20, borderRadius: "50%",
          background: isFav ? C.linen : C.cobalt,
          color: isFav ? C.dust : "#fff", flexShrink: 0,
        }}>
          <HeartIcon filled={!isFav} size={10} />
        </span>
      ),
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          aria-pressed={isFav}
          aria-label={isFav ? `Remove "${poem.title}" from favorites` : `Save "${poem.title}" to favorites`}
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{
            border: `1.5px solid ${isFav || hov ? C.cobalt : C.rule}`,
            background: isFav ? C.cobalt : hov ? C.cobaltTint : "transparent",
            color: isFav ? "#fff" : hov ? C.cobalt : C.dust,
            borderRadius: 100, width: size, height: size,
            display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            cursor: "pointer", transition: "all 0.18s",
          }}
        >
          <HeartIcon filled={isFav} size={Math.round(size * 0.42)} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{isFav ? "Remove from favorites" : "Save to favorites"}</TooltipContent>
    </Tooltip>
  );
}
