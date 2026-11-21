"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { readDemoDishes, type DemoDish } from "@/lib/demo-store";
import { useParams } from "next/navigation";

export default function DishPage() {
  const params = useParams<{ id: string }>();
  const [dish] = useState<DemoDish | null>(() => readDemoDishes().find((item) => item.id === params.id) ?? null);

  if (dish === null) return null;

  return (
    <div className="page-shell">
      <Header />
      <main className="dish-detail">
        <div className="dish-detail-image"><img src={dish.image} alt={dish.name} /></div>
        <article>
          <p className="eyebrow">Fotografía oficial · Datos pendientes</p>
          <h1>{dish.name}</h1>
          <p>{dish.description ?? "Descripción pendiente de validar por el restaurante."}</p>
          <dl>
            <div><dt>Ingredientes</dt><dd>Pendientes de confirmar</dd></div>
            <div><dt>Alérgenos</dt><dd>{dish.allergens}</dd></div>
            <div><dt>Precio</dt><dd>{dish.price || "Pendiente de confirmar"}</dd></div>
          </dl>
          <div className="dish-detail-3d">
            <p><strong>Vista 3D</strong><br />No hay un modelo GLB auténtico de este plato. Esta vista utiliza la fotografía real con profundidad visual aproximada.</p>
          </div>
        </article>
      </main>
    </div>
  );
}
