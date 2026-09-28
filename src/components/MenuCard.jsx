import { ChevronRight } from "lucide-react";
import Badge from "./Badge.jsx";
import MenuImage from "./MenuImage.jsx";
import { formatPrice } from "../data/menu.js";

export default function MenuCard({ item, onSelect }) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Voir les détails de ${item.name}`}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className="group flex min-h-[7.5rem] cursor-pointer items-stretch overflow-hidden rounded-2xl border border-charcoal-950/10 bg-ivory shadow-soft transition hover:border-brand-400 hover:shadow-warm sm:min-h-[9.5rem]"
    >
      <div className="flex flex-1 flex-col justify-center py-4 pl-4 pr-5 sm:py-5 sm:pl-6">
        {item.badges?.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {item.badges.map((b, i) => (
              <Badge key={i} tone={b.tone}>
                {b.label}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-charcoal-950 sm:text-3xl">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal-700">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-display text-2xl uppercase leading-none tracking-wide text-brand-600">
            {formatPrice(item.price)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal-500 transition group-hover:text-brand-600">
            Détails
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="relative w-28 shrink-0 sm:w-40">
        <MenuImage
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    </article>
  );
}