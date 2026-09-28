import { useMemo, useState } from "react";
import { Phone, Search } from "lucide-react";
import { categories, menuItems } from "../data/menu.js";
import { restaurant } from "../data/restaurant.js";
import MenuCard from "./MenuCard.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import ProductModal from "./ProductModal.jsx";

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function MenuSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    let items = menuItems.filter((item) => item.available !== false);
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (q) {
      items = items.filter(
        (item) =>
          normalize(item.name).includes(q) ||
          normalize(item.description).includes(q) ||
          item.ingredients.some((ing) => normalize(ing).includes(q))
      );
    }
    return categories
      .map((cat) => ({ cat, items: items.filter((item) => item.category === cat.id) }))
      .filter((group) => group.items.length > 0);
  }, [query, activeCategory]);

  const total = useMemo(() => groups.reduce((sum, g) => sum + g.items.length, 0), [groups]);

  const counts = useMemo(() => {
    const map = { all: menuItems.filter((i) => i.available !== false).length };
    for (const cat of categories) {
      map[cat.id] = menuItems.filter((i) => i.category === cat.id && i.available !== false).length;
    }
    return map;
  }, []);

  return (
    <section id="menu" className="py-12 sm:py-16">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="kicker text-brand-600">
              <span className="h-2 w-2 rounded-full bg-tomato-500" />
              Notre carte
            </span>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-wide text-charcoal-950 sm:text-6xl">
              Le menu
            </h2>
            <p className="mt-3 max-w-lg text-charcoal-700">
              Pizzas, burgers, sandwiches… préparés minute. Touchez un plat pour voir les détails.
            </p>
          </div>
          <a
            href={restaurant.contact.phoneHref}
            className="btn btn-yellow px-7 py-3.5 text-sm uppercase tracking-wider"
          >
            <Phone className="h-4 w-4" />
            Commander
          </a>
        </div>
      </div>

      <div className="sticky top-16 z-30 mt-8 border-y border-charcoal-950/10 bg-cream/95 backdrop-blur sm:top-[72px]">
        <div className="container-x flex flex-col gap-3 py-3.5">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-500" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="w-full rounded-full border border-charcoal-950/15 bg-ivory py-3 pl-12 pr-4 text-sm text-charcoal-950 shadow-soft outline-none transition placeholder:text-charcoal-500 focus:border-brand-400"
            />
          </div>
          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} counts={counts} />
        </div>
      </div>

      <div className="container-x mt-6">
        <p className="text-sm font-bold uppercase tracking-wider text-charcoal-600">
          {total} plat{total > 1 ? "s" : ""}
        </p>

        {groups.length > 0 ? (
          <ul id="menu-grid" className="mx-auto mt-4 max-w-3xl space-y-9 sm:space-y-12">
            {groups.map(({ cat, items }) => (
              <li key={cat.id}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">
                    {cat.emoji}
                  </span>
                  <h3 className="font-display text-3xl uppercase leading-none tracking-wide text-charcoal-950 sm:text-4xl">
                    {cat.label}
                  </h3>
                  <span className="rounded-full bg-brand-100 px-3 py-1 font-display text-lg uppercase leading-none text-brand-700">
                    {items.length}
                  </span>
                  <span className="flex-1 border-t-2 border-dashed border-charcoal-950/20" />
                </div>
                <div className="mt-4 grid gap-3 sm:gap-4">
                  {items.map((item) => (
                    <MenuCard key={item.id} item={item} onSelect={setSelected} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-dashed border-charcoal-950/20 bg-ivory px-6 py-12 text-center">
            <p className="text-3xl">🤷</p>
            <p className="mt-3 font-bold text-charcoal-950">Aucun plat trouvé</p>
            <p className="mt-1 text-sm text-charcoal-600">Essayez un autre mot-clé.</p>
          </div>
        )}
      </div>

      {selected && <ProductModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}