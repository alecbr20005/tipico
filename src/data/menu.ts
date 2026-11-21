export type MenuItem = {
  id: string;
  name: string;
  category: "Tapas" | "Especialidades" | "Principales";
  status: "provisional";
  sourceNote: string;
};

export const menu: MenuItem[] = [
  { id: "papas-melva", name: "Papas aliñás con melva", category: "Tapas", status: "provisional", sourceNote: "Nombre citado en fuentes públicas; confirmar receta y precio." },
  { id: "tartar-atun", name: "Tartar de atún", category: "Especialidades", status: "provisional", sourceNote: "Nombre citado en reseñas públicas; confirmar presentación y precio." },
  { id: "albondigas-choco", name: "Albóndigas de choco", category: "Especialidades", status: "provisional", sourceNote: "Nombre citado en reseñas públicas; confirmar receta y precio." },
  { id: "carrillada", name: "Carrillada ibérica", category: "Principales", status: "provisional", sourceNote: "Nombre citado en fuentes públicas; confirmar receta y precio." },
  { id: "cochinillo", name: "Lingote de cochinillo", category: "Especialidades", status: "provisional", sourceNote: "Nombre citado en reseñas recientes; confirmar nombre oficial y precio." }
];
