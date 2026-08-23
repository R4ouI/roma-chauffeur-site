export type Vehicle = "car" | "van";

export type TransferRoute = {
  id: string;
  from: string;
  to: string;
  label: string;
  priceCar: number;
  priceVan: number;
  duration: string;
};

export type TourRoute = {
  id: string;
  label: string;
  priceCar: number;
  priceVan: number;
  hours: number;
  extraHourPrice?: number;
  description: string;
  highlights: string[];
};

export const transferRoutes: TransferRoute[] = [
  { id: "t1", from: "Civitavecchia Cruise Port", to: "Rome", label: "Transfer: Civitavecchia Cruise Port > Rome", priceCar: 230, priceVan: 250, duration: "1h" },
  { id: "t2", from: "Rome", to: "Civitavecchia Cruise Port", label: "Transfer: Rome > Civitavecchia Cruise Port", priceCar: 230, priceVan: 250, duration: "1h" },
  { id: "t3", from: "Civitavecchia Cruise Port", to: "FCO Fiumicino Airport", label: "Transfer: Civitavecchia Cruise Port > FCO Fiumicino Airport", priceCar: 200, priceVan: 230, duration: "50m" },
  { id: "t4", from: "FCO Fiumicino Airport", to: "Civitavecchia Cruise Port", label: "Transfer: FCO Fiumicino Airport > Civitavecchia Cruise Port", priceCar: 200, priceVan: 230, duration: "50m" },
  { id: "t5", from: "Rome", to: "FCO Fiumicino Airport", label: "Transfer: Rome > FCO Fiumicino Airport", priceCar: 80, priceVan: 100, duration: "35m" },
  { id: "t6", from: "FCO Fiumicino Airport", to: "Rome", label: "Transfer: FCO Fiumicino Airport > Rome", priceCar: 100, priceVan: 130, duration: "35m" },
  { id: "t7", from: "Rome", to: "Florence", label: "Transfer: Rome > Florence", priceCar: 600, priceVan: 750, duration: "3h 15m" },
  { id: "t8", from: "Florence", to: "Rome", label: "Transfer: Florence > Rome", priceCar: 600, priceVan: 750, duration: "3h 15m" },
  { id: "t9", from: "Rome", to: "Naples", label: "Transfer: Rome > Naples", priceCar: 500, priceVan: 650, duration: "2h 30m" },
  { id: "t10", from: "Naples", to: "Rome", label: "Transfer: Naples > Rome", priceCar: 500, priceVan: 650, duration: "2h 30m" },
];

export const tourRoutes: TourRoute[] = [
  {
    id: "tour1",
    label: "Tour: Civitavecchia — pickup from Roma (max 8 hours)",
    priceCar: 500,
    priceVan: 600,
    hours: 8,
    extraHourPrice: 50,
    description: "From Roma to the historic port of Civitavecchia — seaside promenade, medieval centre and the Etruscan coast at your own pace.",
    highlights: ["Civitavecchia", "Etruscan coast", "Seaside promenade"],
  },
  {
    id: "tour2",
    label: "Tour: Roma — Roma City Tour (max 4 hours)",
    priceCar: 200,
    priceVan: 240,
    hours: 4,
    description: "The essential Rome loop without a guide — driver only. Colosseum, Trevi and the historic centre with photo stops.",
    highlights: ["Colosseum", "Trevi Fountain", "Pantheon"],
  },
];

export const customLocations = [
  "Rome City Center",
  "FCO Fiumicino Airport",
  "CIA Ciampino Airport",
  "Civitavecchia Cruise Port",
  "Vatican City",
  "Colosseum / Ancient Rome",
  "Trastevere",
  "Florence",
  "Naples",
  "Livorno Cruise Port",
  "Naples Cruise Port",
  "Orvieto",
  "Assisi",
  "Pompeii",
  "Sorrento",
  "Amalfi / Positano",
  "Pisa",
  "Civita di Bagnoregio",
  "Tarquinia / Cerveteri",
];

export const tourAttractions = [
  "Colosseum",
  "Trevi Fountain",
  "Pantheon",
  "Piazza Navona",
  "Spanish Steps",
  "Vatican Museums",
  "St. Peter's Basilica",
  "Castel Sant'Angelo",
  "Trastevere",
  "Borghese Gardens",
  "Circus Maximus",
  "Appian Way",
];

// Pricing rules
// Per-km rates derived from the fixed Rome–Florence (273 km) and Rome–Naples (225 km) routes:
//   Van: 750/273 ≈ 2.75 and 650/225 ≈ 2.89  →  €2.80/km
//   Car: 600/273 ≈ 2.20 and 500/225 ≈ 2.22  →  €2.20/km
export const pricingRates = {
  transferPerKm: { car: 2.2, van: 2.8 },
  tourPerHour: { car: 50, van: 60 },
  customTourMinHours: 4,
  customTourMaxHours: 12,
  maxAttractions: 6,
};

// Approximate road distance from Rome City Center (km) for each hub
export const distanceFromRome: Record<string, number> = {
  "Rome City Center": 0,
  "Vatican City": 4,
  "Colosseum / Ancient Rome": 3,
  "Trastevere": 4,
  "FCO Fiumicino Airport": 30,
  "CIA Ciampino Airport": 15,
  "Civitavecchia Cruise Port": 70,
  "Florence": 273,
  "Naples": 225,
  "Naples Cruise Port": 225,
  "Livorno Cruise Port": 300,
  "Orvieto": 120,
  "Assisi": 175,
  "Pompeii": 240,
  "Sorrento": 265,
  "Amalfi / Positano": 275,
  "Pisa": 350,
  "Civita di Bagnoregio": 130,
  "Tarquinia / Cerveteri": 95,
};

// Direct connections that don't route through Rome
const distanceOverrides: Record<string, number> = {
  "FCO Fiumicino Airport|Civitavecchia Cruise Port": 60,
  "FCO Fiumicino Airport|CIA Ciampino Airport": 30,
  "CIA Ciampino Airport|Civitavecchia Cruise Port": 85,
};

export function getDistanceKm(a: string, b: string): number {
  const key = [a, b].sort().join("|");
  if (distanceOverrides[key] !== undefined) return distanceOverrides[key];
  const da = distanceFromRome[a] ?? 0;
  const db = distanceFromRome[b] ?? 0;
  if (da <= 5 && db <= 5) return 5; // both points inside Rome
  return da + db;
}

export type Testimonial = {
  name: string;
  origin: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Victoria & James",
    origin: "London, UK",
    text: "The driver was punctual, the car immaculate. But what made it special was our guide — she knew every corner, every story. We felt like royalty touring our own city.",
    rating: 5,
  },
  {
    name: "Hiroshi T.",
    origin: "Tokyo, Japan",
    text: "I've done private tours in 20 countries. This was the first time I felt the car, the driver, and the guide were all working together perfectly. Flawless experience.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    origin: "New York, USA",
    text: "Booked the Vatican tour for my parents' anniversary. They still talk about it daily. The skip-the-line access alone was worth it, but the personal attention made it unforgettable.",
    rating: 5,
  },
];
