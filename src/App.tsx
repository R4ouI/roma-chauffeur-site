import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Routes from "./components/Routes";
import CustomRoute from "./components/CustomRoute";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handleSelect = (label: string, price: number) => {
    setSelectedLabel(label);
    setSelectedPrice(price);
  };

  const handleCustom = (summary: string, price: number) => {
    setSelectedLabel(summary);
    setSelectedPrice(price);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Routes onSelect={handleSelect} />
        <CustomRoute onConfirm={handleCustom} />
        <Booking selectedLabel={selectedLabel} selectedPrice={selectedPrice} />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
