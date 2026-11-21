"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { initialDemoDishes } from "@/lib/demo-store";

type OcrRow = { name: string; price: string; category: string };

export default function ToolsPage() {
  const [tab, setTab] = useState<"scanner" | "generator" | "images">("scanner");
  const [ocrStatus, setOcrStatus] = useState("");
  const [rows, setRows] = useState<OcrRow[]>([]);
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const scan = async (file: File) => {
    setOcrStatus("Leyendo la carta…");
    setRows([]);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("spa");
      const result = await worker.recognize(file);
      await worker.terminate();
      const lines = result.data.text.split("\n").map((line) => line.trim()).filter(Boolean);
      setRows(lines.slice(0, 30).map((line) => {
        const price = line.match(/(\d+[,.]\d{1,2})\s*€?/)?.[1] ?? "";
        return { name: line.replace(price, "").replace(/€/, "").trim(), price, category: "Pendiente de revisar" };
      }));
      setOcrStatus("Texto extraído. Revisa y corrige cada línea antes de usarla.");
    } catch {
      setOcrStatus("No se pudo procesar la imagen. Prueba con una fotografía nítida y buena iluminación.");
    }
  };

  const generate = () => {
    if (!dishName.trim() || !ingredients.trim()) {
      setDescription("");
      return;
    }
    const list = ingredients.split(",").map((item) => item.trim()).filter(Boolean);
    setDescription(language === "es"
      ? `${dishName.trim()} con ${list.join(", ")}. Una propuesta pensada para disfrutar sus sabores y contrastes en la mesa.`
      : `${dishName.trim()} with ${list.join(", ")}. A proposal designed to enjoy its flavors and contrasts at the table.`);
  };

  const saveDraft = () => {
    localStorage.setItem("tipico-menu-draft", JSON.stringify(rows));
  };

  return (
    <div className="page-shell">
      <Header />
      <header className="page-hero"><p className="eyebrow">Herramientas demo locales</p><h1>Creación de carta</h1></header>
      <main className="page-content">
        <div className="tool-tabs" role="tablist">
          <button role="tab" aria-selected={tab === "scanner"} onClick={() => setTab("scanner")}>Escáner OCR</button>
          <button role="tab" aria-selected={tab === "generator"} onClick={() => setTab("generator")}>Generador de texto</button>
          <button role="tab" aria-selected={tab === "images"} onClick={() => setTab("images")}>Fotografías</button>
        </div>

        {tab === "scanner" && (
          <section className="tool-panel">
            <p className="notice">Demo local con OCR en el navegador. Los datos requieren revisión y no se publican automáticamente.</p>
            <input className="file-input" type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && scan(event.target.files[0])} />
            {ocrStatus && <p role="status" className="tool-status">{ocrStatus}</p>}
            {rows.length > 0 && (
              <>
                <div className="ocr-editor">
                  {rows.map((row, index) => (
                    <div className="ocr-row" key={index}>
                      <input aria-label={`Nombre ${index + 1}`} value={row.name} onChange={(event) => setRows((current) => current.map((item, i) => i === index ? { ...item, name: event.target.value } : item))} />
                      <input aria-label={`Precio ${index + 1}`} value={row.price} onChange={(event) => setRows((current) => current.map((item, i) => i === index ? { ...item, price: event.target.value } : item))} />
                      <select aria-label={`Categoría ${index + 1}`} value={row.category} onChange={(event) => setRows((current) => current.map((item, i) => i === index ? { ...item, category: event.target.value } : item))}>
                        <option>Pendiente de revisar</option><option>Entrantes</option><option>Platos</option><option>Postres</option><option>Bebidas</option>
                      </select>
                    </div>
                  ))}
                </div>
                <button className="tool-primary" type="button" onClick={saveDraft}>Guardar borrador local</button>
              </>
            )}
          </section>
        )}

        {tab === "generator" && (
          <section className="tool-panel">
            <p className="notice">Generador determinista: no utiliza IA externa ni añade ingredientes, técnicas o alérgenos no facilitados.</p>
            <div className="generator-grid">
              <label>Nombre del plato<input value={dishName} onChange={(event) => setDishName(event.target.value)} /></label>
              <label>Idioma<select value={language} onChange={(event) => setLanguage(event.target.value as "es" | "en")}><option value="es">Español</option><option value="en">English</option></select></label>
              <label className="full">Ingredientes separados por comas<textarea value={ingredients} onChange={(event) => setIngredients(event.target.value)} /></label>
              <button className="tool-primary" type="button" onClick={generate}>Generar descripción</button>
            </div>
            {description && <textarea className="generated-copy" aria-label="Descripción generada" value={description} onChange={(event) => setDescription(event.target.value)} />}
          </section>
        )}

        {tab === "images" && (
          <section className="tool-panel">
            <p className="notice">Biblioteca de fotografías oficiales proporcionadas por el propietario. No se generan imágenes artificiales.</p>
            <input className="file-input" type="file" accept="image/*" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setImagePreview(URL.createObjectURL(file));
            }} />
            {imagePreview && <img className="image-preview" src={imagePreview} alt="Vista previa local" />}
            <div className="image-library">
              {initialDemoDishes.map((dish) => <img key={dish.id} src={dish.image} alt={dish.name} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
