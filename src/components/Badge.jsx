export default function Badge({ children, tone = "brand", className = "" }) {
  const tones = {
    brand: "bg-brand-400 text-charcoal-950",
    dark: "bg-charcoal-950 text-ivory",
    warm: "bg-gold-500/90 text-charcoal-950",
    cream: "bg-ivory text-charcoal-950",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-soft ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}