document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("listaRecetas");

  if (!contenedor) {
    console.error("No se encontró el contenedor #listaRecetas");
    return;
  }

  contenedor.textContent = "Cargando recetas desde el servidor...";

  try {
    const respuesta = await fetch("http://localhost:3000/api/recetas");

    console.log("Status de /api/recetas:", respuesta.status);

    if (!respuesta.ok) {
      contenedor.textContent = "Error al obtener recetas del servidor.";
      return;
    }

    const recetas = await respuesta.json();
    console.log("Recetas recibidas:", recetas);

    if (!Array.isArray(recetas) || recetas.length === 0) {
      contenedor.textContent = "No hay recetas registradas aún.";
      return;
    }

    contenedor.innerHTML = "";

    recetas.forEach((receta) => {
      const div = document.createElement("div");
      div.classList.add("receta-card");

      div.innerHTML = `
        <h3>${receta.titulo}</h3>
        <p>${receta.descripcion || "Sin descripción"}</p>
        <p><strong>Categoría:</strong> ${receta.categoria || "N/A"}</p>
        <p><strong>Dificultad:</strong> ${receta.dificultad || "N/A"}</p>
        <a href="./views/receta-detalle.html?id=${receta._id}">Ver detalle</a>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error en fetch /api/recetas:", error);
    contenedor.textContent = "Error de conexión con el servidor.";
  }
});