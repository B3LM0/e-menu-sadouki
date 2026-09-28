import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { restaurant } from "../data/restaurant.js";

const MOBILE_LIMIT = 4;

function useIsMobile() {
  const query = "(max-width: 639px)";
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return matches;
}

const normalize = (s) =>
  s
    .replace(/[أإآ]/g, "ا")
    .replace(/[ىيیېے]/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ة/g, "ه")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const formatRange = (rate) =>
  rate.to ? `de ${rate.from} DA à ${rate.to} DA` : `${rate.from} DA`;

function ZoneRow({ rate, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(rate.zone)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-brand-100 sm:px-7"
      >
        <span dir="rtl" className="font-bold text-charcoal-900">
          {rate.zone}
        </span>
        <span className="whitespace-nowrap rounded-full bg-brand-100 px-3 py-1 font-display text-lg uppercase leading-none tracking-wide text-brand-700">
          {formatRange(rate)}
        </span>
      </button>
    </li>
  );
}

function ZoneCard({ rate }) {
  return (
    <li className="flex flex-col gap-1.5 rounded-2xl border border-charcoal-950/5 bg-ivory px-4 py-3.5 shadow-soft">
      <span dir="rtl" className="text-sm font-bold text-charcoal-900">
        {rate.zone}
      </span>
      <span className="font-display text-lg uppercase leading-none tracking-wide text-brand-600">
        {formatRange(rate)}
      </span>
    </li>
  );
}

export default function DeliveryRatesSection() {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const d = restaurant.delivery;
  const rates = d.rates;

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return rates;
    return rates.filter((r) => normalize(r.zone).includes(q));
  }, [query, rates]);

  const visible = isMobile ? (showAll ? filtered : filtered.slice(0, MOBILE_LIMIT)) : filtered;
  const minFee = Math.min(...rates.map((r) => r.from));

  return (
    <section id="tarifs" className="section-pad bg-sand/70">
      <div className="container-x max-w-4xl">
        <SectionHeading eyebrow={d.eyebrow} title={d.ratesTitle} subtitle={d.ratesSubtitle} />

        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-700" />
          <input
            id="zone-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher votre zone..."
            className="w-full rounded-full border border-charcoal-950/10 bg-ivory py-3 pl-12 pr-4 text-sm text-charcoal-950 shadow-soft outline-none transition focus:border-brand-500"
          />
        </div>

        <Reveal>
          <div className="mt-8 overflow-hidden rounded-3xl bg-ivory shadow-soft ring-1 ring-charcoal-950/5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-400 px-5 py-4 sm:px-7">
              <p className="font-display text-2xl uppercase leading-none tracking-wide text-charcoal-950">
                {filtered.length} zone{filtered.length > 1 ? "s" : ""} desservies
              </p>
              <span className="rounded-full bg-charcoal-950 px-4 py-1.5 font-display text-xl uppercase leading-none tracking-wide text-brand-400">
                Dès {minFee} DA
              </span>
            </div>

            {isMobile ? (
              <ul className="divide-y divide-charcoal-950/5">
                {visible.map((r) => (
                  <ZoneRow key={r.zone} rate={r} onSelect={setQuery} />
                ))}
              </ul>
            ) : (
              <ul className="grid gap-2 p-5 sm:grid-cols-3 sm:p-7">
                {visible.map((r) => (
                  <ZoneCard key={r.zone} rate={r} />
                ))}
              </ul>
            )}

            {filtered.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-charcoal-700">
                Aucune zone trouvée. Réessayez ou contactez-nous.
              </p>
            )}
          </div>
        </Reveal>

        {isMobile && filtered.length > MOBILE_LIMIT && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="btn btn-dark mx-auto mt-5 px-7 py-3 text-sm uppercase tracking-wider"
          >
            {showAll ? "Voir moins" : `Afficher tout (${filtered.length} zones)`}
          </button>
        )}

        <p className="mt-6 text-center text-xs text-charcoal-700">{d.ratesNote}</p>
      </div>
    </section>
  );
}