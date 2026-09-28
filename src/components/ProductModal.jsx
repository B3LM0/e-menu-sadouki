import { useEffect } from "react";
import { Phone, X } from "lucide-react";
import Badge from "./Badge.jsx";
import MenuImage from "./MenuImage.jsx";
import { formatPrice } from "../data/menu.js";
import { restaurant } from "../data/restaurant.js";

export default function ProductModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-charcoal-950/40 text-ivory backdrop-blur transition hover:bg-charcoal-950/60"
        >
          <X className="h-5 w-5" />
        </button>

        <MenuImage
          src={item.image}
          alt={item.name}
          className="h-52 w-full object-cover sm:h-64"
        />

        <div className="p-5 sm:p-7">
          {item.badges?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.badges.map((b, i) => (
                <Badge key={i} tone={b.tone}>
                  {b.label}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="mt-3 font-display text-4xl uppercase leading-none tracking-wide text-charcoal-950">
            {item.name}
          </h3>
          <p className="mt-2 font-display text-2xl uppercase tracking-wide text-brand-600">
            {formatPrice(item.price)}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal-700">{item.description}</p>

          {item.ingredients?.length > 0 && (
            <div className="mt-5 rounded-2xl bg-sand p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Ingrédients
              </p>
              <p className="mt-1.5 text-sm text-charcoal-900">{item.ingredients.join(" · ")}</p>
            </div>
          )}

          {item.allergens?.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Allergènes :
              </span>
              {item.allergens.map((a, i) => (
                <span
                  key={i}
                  className="rounded-full border border-charcoal-950/10 bg-ivory px-3 py-1 text-xs font-semibold text-charcoal-700"
                >
                  {a}
                </span>
              ))}
            </div>
          )}

          <a
            href={restaurant.contact.phoneHref}
            className="btn btn-yellow mt-7 w-full py-4 text-lg uppercase tracking-wider"
          >
            <Phone className="h-5 w-5" />
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}