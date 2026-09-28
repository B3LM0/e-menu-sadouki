import Logo from "./Logo.jsx";
import SocialIcon from "./SocialIcon.jsx";
import { restaurant } from "../data/restaurant.js";

export default function Footer({ onShowMenu }) {
  const f = restaurant.footer;

  return (
    <footer className="bg-charcoal-950 text-ivory">
      <div className="h-1.5 bg-brand-400" />
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{f.slogan}</p>
            <div className="mt-5 flex gap-2">
              {restaurant.contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-ivory/10 text-ivory transition hover:bg-brand-400 hover:text-charcoal-950"
                >
                  <SocialIcon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav>
            <p className="font-display text-xl uppercase tracking-wide text-brand-400">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={onShowMenu}
                  className="text-sm text-cream/80 transition hover:text-brand-300"
                >
                  Menu
                </button>
              </li>
              <li>
                <a href="#tarifs" className="text-sm text-cream/80 transition hover:text-brand-300">
                  Livraison
                </a>
              </li>
              <li>
                <a href={restaurant.contact.phoneHref} className="text-sm text-cream/80 transition hover:text-brand-300">
                  {restaurant.contact.phone}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-display text-xl uppercase tracking-wide text-brand-400">
              {f.contactTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>{restaurant.contact.address}</li>
              <li>
                <a href={restaurant.contact.phoneHref} className="transition hover:text-brand-300">
                  {restaurant.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${restaurant.contact.email}`} className="transition hover:text-brand-300">
                  {restaurant.contact.email}
                </a>
              </li>
              <li>{restaurant.contact.hoursCompact}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}