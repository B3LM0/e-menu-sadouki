export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <span className={`kicker text-brand-600 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-2 w-2 rounded-full bg-tomato-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-wide text-charcoal-950 sm:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-charcoal-700">{subtitle}</p>}
    </div>
  );
}