document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("listaRecetas");
  const formFiltros = document.getElementById("formFiltros");
  const inputCategoria = document.getElementById("filtroCategoria");
  const inputIngrediente = document.getElementById("filtroIngrediente");
  const btnLimpiar = document.getElementById("btnLimpiar");

  if (!contenedor) {
    console.error("No se encontró el contenedor #listaRecetas");
    return;
  }

  // Función reutilizable para cargar recetas con o sin filtros
  async function cargarRecetas({ categoria = "", ingrediente = "" } = {}) {
    contenedor.textContent = "Cargando recetas desde el servidor...";

    try {
      // Construimos la URL con query params opcionales
      let url = "http://localhost:3000/api/recetas";
      const params = new URLSearchParams();

      if (categoria.trim() !== "") {
        params.append("categoria", categoria.trim());
      }
      if (ingrediente.trim() !== "") {
        params.append("ingrediente", ingrediente.trim());
      }

      const queryString = params.toString();
      if (queryString) {
        url += "?" + queryString;
      }

      console.log("Llamando a:", url);

      const respuesta = await fetch(url);
      console.log("Status de /api/recetas:", respuesta.status);

      if (!respuesta.ok) {
        contenedor.textContent = "Error al obtener recetas del servidor.";
        return;
      }

      const recetas = await respuesta.json();
      console.log("Recetas recibidas:", recetas);

      if (!Array.isArray(recetas) || recetas.length === 0) {
        contenedor.textContent = "No se encontraron recetas con esos filtros.";
        return;
      }

      contenedor.innerHTML = "";

      recetas.forEach((receta) => {
  const col = document.createElement("div");
  col.classList.add("col-12", "col-md-6", "col-lg-4");

  col.innerHTML = `
    <article class="card h-100" aria-label="Receta ${receta.titulo}">
      <div class="card-body">
        <h2 class="card-title h5">${receta.titulo}</h2>
        <p class="card-text">${receta.descripcion || "Sin descripción"}</p>
        <p class="card-text">
          <strong>Categoría:</strong> ${receta.categoria || "N/A"}<br>
          <strong>Dificultad:</strong> ${receta.dificultad || "N/A"}
        </p>
        <a class="btn btn-sm btn-outline-primary"
           href="./views/receta-detalle.html?id=${receta._id}">
          Ver detalle
        </a>
      </div>
    </article>
  `;

  contenedor.appendChild(col);
});

    } catch (error) {
      console.error("Error en fetch /api/recetas:", error);
      contenedor.textContent = "Error de conexión con el servidor.";
    }
  }

  // 📌 1) Cargar todas las recetas al inicio
  cargarRecetas();

  // 📌 2) Manejar envío del formulario de filtros
  if (formFiltros) {
    formFiltros.addEventListener("submit", (e) => {
      e.preventDefault();
      const categoria = inputCategoria.value;
      const ingrediente = inputIngrediente.value;

      cargarRecetas({ categoria, ingrediente });
    });
  }

  // 📌 3) Botón de limpiar filtros
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      inputCategoria.value = "";
      inputIngrediente.value = "";
      cargarRecetas(); // vuelve a cargar todo sin filtros
    });
  }
});