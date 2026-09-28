import { useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#f4ecd9"/><circle cx="300" cy="160" r="66" fill="#fde047"/><text x="300" y="220" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#a16207" text-anchor="middle">Pizzeria Sadouki</text><text x="300" y="244" font-family="Arial, sans-serif" font-size="13" fill="#4a382c" text-anchor="middle">Photo à venir</text></svg>`
  );

export default function MenuImage({ src, alt = "", className = "", loading = "lazy" }) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      onError={() => {
        if (current !== PLACEHOLDER) setCurrent(PLACEHOLDER);
      }}
      className={className}
    />
  );
}