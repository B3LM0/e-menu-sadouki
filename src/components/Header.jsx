import { Phone, Truck } from "lucide-react";
import Logo from "./Logo.jsx";
import { restaurant } from "../data/restaurant.js";

const links = [
  { id: "menu", label: "Menu" },
  { id: "tarifs", label: "Livraison" },
];

export default function Header({ onShowMenu }) {
  const handleLink = (e, link) => {
    if (link.id === "menu") {
      e.preventDefault();
      onShowMenu();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-brand-400 bg-cream/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLink(e, link)}
              className="rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-900 underline-offset-4 transition hover:bg-brand-100 hover:text-charcoal-950 hover:underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={restaurant.contact.phoneHref}
            className="ml-2 hidden items-center gap-2 rounded-full border border-charcoal-950/10 bg-ivory px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-900 transition hover:border-charcoal-950/40 xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-brand-600" />
            {restaurant.contact.phone}
          </a>
          <button
            type="button"
            onClick={onShowMenu}
            className="btn btn-yellow ml-2 px-5 py-2.5 text-sm uppercase tracking-wider"
          >
            Voir le menu
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={restaurant.contact.phoneHref}
            aria-label={`Appeler le ${restaurant.name}`}
            className="grid h-10 w-10 place-items-center rounded-lg bg-brand-400 text-charcoal-950 shadow-soft transition hover:bg-brand-300"
          >
            <Phone className="h-5 w-5 animate-ring" />
          </a>
          <a
            href="#tarifs"
            className="btn btn-dark h-10 px-4 text-xs uppercase tracking-wider"
          >
            <Truck className="h-4 w-4" />
            Livraison
          </a>
        </div>
      </div>
    </header>
  );
}