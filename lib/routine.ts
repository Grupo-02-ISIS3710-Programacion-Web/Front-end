import { Routine } from "@/types/routine";
import { getProducts } from "@/lib/api";

const products = getProducts();
export const routines: Routine[] = [
  {
    id: "routine-1",
    name: "Morning Hydration",
    description: "Rutina enfocada en hidratación y protección solar.",
    type: "AM",
    steps: [
      {
        id: "step-1",
        order: 1,
        product: products[0].id,
        notes: "Aplicar sobre piel ligeramente húmeda"
      },
      {
        id: "step-2",
        order: 2,
        product: products[4].id
      }
    ]
  },
  {
    id: "routine-2",
    name: "Night Repair",
    description: "Rutina nocturna para reparación y renovación celular.",
    type: "PM",
    steps: [
      {
        id: "step-1",
        order: 1,
        product: products[2].id
      },
      {
        id: "step-2",
        order: 2,
        product: products[5].id
      }
    ]
  },
  {
    id: "routine-3",
    name: "Acne Control AM",
    description: "Rutina matutina ligera para controlar brillo y prevenir brotes.",
    type: "AM",
    steps: [
      {
        id: "step-1",
        order: 1,
        product: products[10].id // Effaclar Gel
      },
      {
        id: "step-2",
        order: 2,
        product: products[12].id, // Niacinamide
        notes: "Aplicar solo en zonas con tendencia acneica"
      },
      {
        id: "step-3",
        order: 3,
        product: products[4].id // Hydro Boost
      }
    ]
  },
  {
    id: "routine-4",
    name: "Glow & Exfoliation Night",
    description: "Rutina nocturna con exfoliación química para mejorar textura.",
    type: "PM",
    steps: [
      {
        id: "step-1",
        order: 1,
        product: products[11].id // Hydrating Cleanser
      },
      {
        id: "step-2",
        order: 2,
        product: products[2].id, // Glycolic Acid
        notes: "Usar máximo 3 veces por semana"
      },
      {
        id: "step-3",
        order: 3,
        product: products[13].id // Snail Essence
      },
      {
        id: "step-4",
        order: 4,
        product: products[9].id // Snail Essence
      },
      {
        id: "step-5",
        order: 5,
        product: products[4].id // Snail Essence
      }
    ]
  },
  {
    id: "routine-5",
    name: "Barrier Repair Focus",
    description: "Rutina enfocada en reparar la barrera cutánea y calmar irritación.",
    type: "PM",
    steps: [
      {
        id: "step-1",
        order: 1,
        product: products[11].id
      },
      {
        id: "step-2",
        order: 2,
        product: products[5].id, // Cicaplast
        notes: "Aplicar una capa generosa en zonas irritadas"
      }
    ]
  }
];