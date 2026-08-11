export type TransferRoute = {
  id: string;
  from: string;
  to: string;
  label: string;
  price: number;
  duration: string;
};

export type TourRoute = {
  id: string;
  label: string;
  price: number;
  hours: number;
  description: string;
  highlights: string[];
};

export const transferRoutes: TransferRoute[] = [
  { id: "t1", from: "CIA Ciampino Airport", to: "Civitavecchia Cruise Port", label: "Transfer: CIA Ciampino Airport > Civitavecchia Cruise Port", price: 280, duration: "1h 15m" },
  { id: "t2", from: "CIA Ciampino Airport", to: "FCO Fiumicino Airport", label: "Transfer: CIA Ciampino Airport > FCO Fiumicino Airport", price: 75, duration: "45m" },
  { id: "t3", from: "CIA Ciampino Airport", to: "Rome", label: "Transfer: CIA Ciampino Airport > Rome", price: 55, duration: "30m" },
  { id: "t4", from: "Civitavecchia Cruise Port", to: "CIA Ciampino Airport", label: "Transfer: Civitavecchia Cruise Port > CIA Ciampino Airport", price: 280, duration: "1h 15m" },
  { id: "t5", from: "Civitavecchia Cruise Port", to: "FCO Fiumicino Airport", label: "Transfer: Civitavecchia Cruise Port > FCO Fiumicino Airport", price: 290, duration: "1h 10m" },
  { id: "t6", from: "Civitavecchia Cruise Port", to: "Rome", label: "Transfer: Civitavecchia Cruise Port > Rome", price: 240, duration: "1h" },
  { id: "t7", from: "FCO Fiumicino Airport", to: "Civitavecchia Cruise Port", label: "Transfer: FCO Fiumicino Airport > Civitavecchia Cruise Port", price: 290, duration: "1h 10m" },
  { id: "t8", from: "FCO Fiumicino Airport", to: "Rome", label: "Transfer: FCO Fiumicino Airport > Rome", price: 55, duration: "35m" },
  { id: "t9", from: "FCO Fiumicino Airport", to: "CIA Ciampino Airport", label: "Transfer: FCO Fiumicino Airport > CIA Ciampino Airport", price: 75, duration: "45m" },
  { id: "t10", from: "Florence", to: "Rome", label: "Transfer: Florence > Rome", price: 450, duration: "3h 15m" },
  { id: "t11", from: "Naples", to: "Rome", label: "Transfer: Naples > Rome", price: 420, duration: "2h 30m" },
  { id: "t12", from: "Rome", to: "CIA Ciampino Airport", label: "Transfer: Rome > CIA Ciampino Airport", price: 55, duration: "30m" },
  { id: "t13", from: "Rome", to: "Civitavecchia Cruise Port", label: "Transfer: Rome > Civitavecchia Cruise Port", price: 240, duration: "1h" },
  { id: "t14", from: "Rome", to: "FCO Fiumicino Airport", label: "Transfer: Rome > FCO Fiumicino Airport", price: 55, duration: "35m" },
  { id: "t15", from: "Rome", to: "Florence", label: "Transfer: Rome > Florence", price: 450, duration: "3h 15m" },
  { id: "t16", from: "Rome", to: "Naples", label: "Transfer: Rome > Naples", price: 420, duration: "2h 30m" },
];

export const tourRoutes: TourRoute[] = [
  {
    id: "tour1",
    label: "Tour: Rome Half day – Private chauffeur (4 hours)",
    price: 350,
    hours: 4,
    description: "Essential Rome in half a day — Colosseum exterior, Trevi, Pantheon & Piazza Navona with time for espresso.",
    highlights: ["Colosseum", "Trevi Fountain", "Pantheon"],
  },
  {
    id: "tour2",
    label: "Tour: Rome Full Day - Private Chauffeur (8 hours)",
    price: 550,
    hours: 8,
    description: "The full Eternal City at your pace. Ancient, baroque and hidden Rome with a dedicated driver-guide.",
    highlights: ["Vatican", "Colosseum", "Trastevere"],
  },
  {
    id: "tour3",
    label: "Tour: Civitavecchia Cruise Port > Rome - Full day (9 Hours)",
    price: 650,
    hours: 9,
    description: "From the ship to the heart of Rome and back. Maximise your port day without the stress.",
    highlights: ["Port pickup", "Rome highlights", "Return on time"],
  },
  {
    id: "tour4",
    label: "Tour: Orvieto - Civita di Bagnoregio from Civitavecchia Cruise Port Full day (9 hours)",
    price: 680,
    hours: 9,
    description: "Clifftop towns of Umbria & Lazio — Orvieto's Duomo and the breathtaking dying town of Civita.",
    highlights: ["Orvieto", "Civita di Bagnoregio", "Countryside"],
  },
  {
    id: "tour5",
    label: "Tour: Orvieto - Assisi from Rome - Private chauffeur Full day (10 hours)",
    price: 750,
    hours: 10,
    description: "Spiritual Umbria: Etruscan Orvieto and Saint Francis' Assisi — frescoes, hills and medieval charm.",
    highlights: ["Orvieto", "Assisi", "Basilica Papale"],
  },
  {
    id: "tour6",
    label: "Tour: Pompei - Sorrento - Amalfi Coast from Naples Cruise Port – Private chauffeur – Full day (9 hours)",
    price: 680,
    hours: 9,
    description: "Naples port day: walk through Pompeii, then Sorrento lemons and Amalfi's cliff-hanging coastline.",
    highlights: ["Pompeii", "Sorrento", "Amalfi Coast"],
  },
  {
    id: "tour7",
    label: "Tour: Pisa - Florence from Livorno Cruise Port - Full day (9 hours)",
    price: 680,
    hours: 9,
    description: "Tuscany in a day — lean with Pisa, linger in Florence. Perfectly timed for your cruise schedule.",
    highlights: ["Pisa Tower", "Florence Duomo", "Ponte Vecchio"],
  },
  {
    id: "tour8",
    label: "Tour: Rome - Etruscan Tour – Private chauffeur (9 hours)",
    price: 650,
    hours: 9,
    description: "Mysterious Etruria: Tarquinia tombs, Cerveteri necropolis and charming Bracciano lake towns.",
    highlights: ["Tarquinia", "Cerveteri", "Bracciano"],
  },
  {
    id: "tour9",
    label: "Tour: Civitavecchia - Etruscan Tour – Private chauffeur (9 hours)",
    price: 650,
    hours: 9,
    description: "From port to the Etruscan heartland — uncrowded, UNESCO-listed wonders just inland from Civitavecchia.",
    highlights: ["Etruscan Necropolis", "Medieval villages", "Countryside"],
  },
  {
    id: "tour10",
    label: "Tour: Rome - Pompeii - Sorrento - Amalfi Coast - Positano from Rome - Private Driver - Full Day (12 hours)",
    price: 950,
    hours: 12,
    description: "The ultimate day trip from Rome: Pompeii at sunrise, then the full Amalfi ribbon to Positano.",
    highlights: ["Pompeii", "Sorrento", "Positano"],
  },
  {
    id: "tour11",
    label: "Tour: Rome - Pisa - Florence - Departure from Rome - Full Day (12 hours)",
    price: 950,
    hours: 12,
    description: "Tuscany's greatest hits in one seamless day — high-speed comfort without the trains or crowds.",
    highlights: ["Pisa", "Florence", "Tuscan drive"],
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
