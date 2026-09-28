import { categories } from "../data/menu.js";

const tabs = [{ id: "all", label: "Tous", emoji: "✨" }, ...categories];

export default function CategoryFilter({ active, onSelect, counts }) {
  return (
    <div className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition ${
              isActive
                ? "bg-brand-400 text-charcoal-950 shadow-warm"
                : "bg-ivory text-charcoal-800 ring-1 ring-charcoal-950/10 hover:bg-brand-100 hover:text-charcoal-950"
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
            <span
              className={`ml-0.5 rounded-full px-1.5 text-[11px] ${
                isActive ? "bg-charcoal-950/15 text-charcoal-950" : "bg-sand text-brand-700"
              }`}
            >
              {counts?.[tab.id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}