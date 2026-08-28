import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Routes from "./components/Routes";
import CustomRoute from "./components/CustomRoute";
import Booking, { type Selection } from "./components/Booking";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelect = (label: string, priceCar: number, priceVan: number) => {
    setSelection({ label, priceCar, priceVan });
  };

  const handleCustom = (summary: string, priceCar: number, priceVan: number) => {
    setSelection({ label: summary, priceCar, priceVan });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Routes onSelect={handleSelect} />
        <CustomRoute onConfirm={handleCustom} />
        <Booking selection={selection} />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
