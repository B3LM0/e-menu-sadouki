import { useCallback } from "react";
import Header from "./components/Header.jsx";
import MenuSection from "./components/MenuSection.jsx";
import DeliveryRatesSection from "./components/DeliveryRatesSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const showMenu = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);

  return (
    <>
      <Header onShowMenu={showMenu} />
      <main>
        <MenuSection />
        <DeliveryRatesSection />
      </main>
      <Footer onShowMenu={showMenu} />
    </>
  );
}