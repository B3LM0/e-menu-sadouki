import { restaurant } from "../data/restaurant.js";

export default function Logo({ dark = false, onClick, className = "" }) {
  return (
    <a href="#hero" onClick={onClick} className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-charcoal-950 text-xl ring-2 ring-brand-400 transition group-hover:ring-brand-300">
        🍕
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-2xl uppercase tracking-wide ${dark ? "text-ivory" : "text-charcoal-950"}`}
        >
          {restaurant.name}
        </span>
        <span
          className={`mt-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] ${dark ? "text-brand-300" : "text-brand-600"}`}
        >
          {restaurant.logoSubtext}
        </span>
      </span>
    </a>
  );
}