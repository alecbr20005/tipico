export type DemoDish = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: string;
  image: string;
  allergens: string;
  published: boolean;
  dataStatus: "pending";
};

export const initialDemoDishes: DemoDish[] = [
  { id: "dish-01", name: "Plato compartido 01", description: null, category: "Pendiente", price: "", image: "/images/dishes/gambas-sarten.webp", allergens: "Pendiente de validar", published: true, dataStatus: "pending" },
  { id: "dish-02", name: "Plato compartido 02", description: null, category: "Pendiente", price: "", image: "/images/dishes/plato-negro.webp", allergens: "Pendiente de validar", published: true, dataStatus: "pending" },
  { id: "dish-03", name: "Plato compartido 03", description: null, category: "Pendiente", price: "", image: "/images/dishes/croquetas-piedra.webp", allergens: "Pendiente de validar", published: true, dataStatus: "pending" },
  { id: "dish-04", name: "Plato compartido 04", description: null, category: "Pendiente", price: "", image: "/images/dishes/sopa-servicio.webp", allergens: "Pendiente de validar", published: true, dataStatus: "pending" },
  { id: "dish-05", name: "Plato compartido 05", description: null, category: "Pendiente", price: "", image: "/images/dishes/plato-negro-largo.webp", allergens: "Pendiente de validar", published: true, dataStatus: "pending" },
];

export function readDemoDishes(): DemoDish[] {
  if (typeof window === "undefined") return initialDemoDishes;
  try {
    const value = localStorage.getItem("tipico-demo-dishes");
    return value ? JSON.parse(value) : initialDemoDishes;
  } catch {
    return initialDemoDishes;
  }
}

export function saveDemoDishes(dishes: DemoDish[]) {
  localStorage.setItem("tipico-demo-dishes", JSON.stringify(dishes));
}
