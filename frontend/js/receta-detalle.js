document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("detalleReceta");

  if (!contenedor) {
    console.error("No se encontró el contenedor #detalleReceta");
    return;
  }

  contenedor.textContent = "Cargando detalles desde el servidor...";

  // Obtener el ID de la receta desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("ID de receta obtenido de la URL:", id);

  if (!id) {
    contenedor.textContent = "No se especificó una receta.";
    return;
  }

  try {
    const url = `http://localhost:3000/api/recetas/${id}`;
    console.log("Llamando a:", url);

    const respuesta = await fetch(url);
    console.log("Status de /api/recetas/:id:", respuesta.status);

    if (!respuesta.ok) {
      contenedor.textContent = "No se pudo cargar la receta (404 o error de servidor).";
      return;
    }

    const receta = await respuesta.json();
    console.log("Receta recibida:", receta);

    if (!receta || !receta.titulo) {
      contenedor.textContent = "La receta no existe o los datos son inválidos.";
      return;
    }

    contenedor.innerHTML = `
      <h2>${receta.titulo}</h2>
      <p>${receta.descripcion || "Sin descripción"}</p>

      <h3>Ingredientes:</h3>
      <ul>
        ${
          receta.ingredientes && receta.ingredientes.length > 0
            ? receta.ingredientes
                .map(
                  (ing) =>
                    `<li>${ing.nombre} ${
                      ing.cantidad ? `- ${ing.cantidad}` : ""
                    } ${ing.unidad || ""}</li>`
                )
                .join("")
            : "<li>Sin ingredientes registrados.</li>"
        }
      </ul>

      <h3>Pasos:</h3>
      <ol>
        ${
          receta.pasos && receta.pasos.length > 0
            ? receta.pasos.map((paso) => `<li>${paso}</li>`).join("")
            : "<li>Sin pasos registrados.</li>"
        }
      </ol>

      <p><strong>Categoría:</strong> ${receta.categoria || "N/A"}</p>
      <p><strong>Dificultad:</strong> ${receta.dificultad || "N/A"}</p>
      <p><strong>Tiempo de preparación:</strong> ${
        receta.tiempoPreparacion || "N/A"
      } min</p>
      <p><strong>Porciones:</strong> ${receta.porciones || "N/A"}</p>
      <p><strong>Presupuesto por porción:</strong> ₡${
        receta.presupuestoPorPorcion || "N/A"
      }</p>
    `;
  } catch (error) {
    console.error("Error en fetch /api/recetas/:id:", error);
    contenedor.textContent = "Error de conexión al cargar la receta.";
  }
});