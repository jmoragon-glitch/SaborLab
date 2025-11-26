document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("detalleReceta");

  // Obtener el ID de la receta desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    contenedor.textContent = "No se especificó una receta.";
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:3000/api/recetas/${id}`);
    const receta = await respuesta.json();

    contenedor.innerHTML = `
      <h2>${receta.titulo}</h2>
      <p>${receta.descripcion || "Sin descripción"}</p>

      <h3>Ingredientes:</h3>
      <ul>
        ${receta.ingredientes
          .map(
            ing =>
              `<li>${ing.nombre} — ${ing.cantidad || ""} ${ing.unidad || ""}</li>`
          )
          .join("")}
      </ul>

      <h3>Pasos:</h3>
      <ol>
        ${receta.pasos.map(paso => `<li>${paso}</li>`).join("")}
      </ol>

      <p><strong>Categoría:</strong> ${receta.categoria || "N/A"}</p>
      <p><strong>Dificultad:</strong> ${receta.dificultad}</p>
      <p><strong>Tiempo de preparación:</strong> ${receta.tiempoPreparacion || "N/A"} min</p>
      <p><strong>Porciones:</strong> ${receta.porciones || "N/A"}</p>
      <p><strong>Presupuesto por porción:</strong> ₡${receta.presupuestoPorPorcion || "N/A"}</p>
    `;
  } catch (error) {
    contenedor.textContent = "Error al cargar receta.";
  }
});