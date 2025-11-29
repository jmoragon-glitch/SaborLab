// ===============================
// CARGAR DETALLE DE LA RECETA
// ===============================
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
      // Opcional:
      // mostrarToast("No se pudo cargar la receta 😢", "danger");
      return;
    }

    const receta = await respuesta.json();
    console.log("Receta recibida:", receta);

    if (!receta || !receta.titulo) {
      contenedor.textContent = "La receta no existe o los datos son inválidos.";
      // mostrarToast("La receta no existe o los datos son inválidos 😢", "danger");
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
    // mostrarToast("Error de conexión al cargar la receta 😢", "danger");
  }
});

// ===============================
// ELIMINAR RECETA (BOTÓN + MODAL)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Tomar el id de la receta desde la URL
  const params = new URLSearchParams(window.location.search);
  const recetaId = params.get("id");

  const btnEliminar = document.getElementById("btnEliminarReceta");
  const modalEliminarEl = document.getElementById("modalConfirmarEliminar");
  const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");

  // Si falta algo, no hacemos nada
  if (!btnEliminar || !recetaId || !modalEliminarEl || !btnConfirmarEliminar) {
    return;
  }

  const modalEliminar = new bootstrap.Modal(modalEliminarEl);

  // Cuando clickea el botón rojo en la página → mostramos el modal
  btnEliminar.addEventListener("click", () => {
    modalEliminar.show();
  });

  // Cuando clickea el botón "Eliminar" dentro del modal → hacemos el DELETE
  btnConfirmarEliminar.addEventListener("click", async () => {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/recetas/${recetaId}`,
        {
          method: "DELETE"
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        mostrarToast(
          data.mensajeError || "No se pudo eliminar la receta 😢",
          "danger"
        );
        modalEliminar.hide();
        return;
      }

      mostrarToast("Receta eliminada correctamente 🎉", "success");
      modalEliminar.hide();

      // Redirigir al listado después de un pequeño delay
      setTimeout(() => {
        window.location.href = "../recetas.html";
      }, 800);
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      mostrarToast("Error de conexión al eliminar la receta 😢", "danger");
      modalEliminar.hide();
    }
  });
});

// ===============================
// TOAST GENÉRICO
// ===============================
function mostrarToast(mensaje, tipo = "primary") {
  const toastEl = document.getElementById("toastGeneral");
  const toastBody = document.getElementById("toastMensaje");

  if (!toastEl || !toastBody) {
    console.warn("No se encontró el contenedor de toast en el DOM.", mensaje);
    return; // ya NO usamos alert como fallback
  }

  toastBody.textContent = mensaje;

  // Cambiar color según tipo (success, danger, warning, info, et  c.)
  toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}