document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCrearReceta");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    mensaje.textContent = "Guardando receta...";

    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const dificultad = document.getElementById("dificultad").value;
    const tiempoPreparacion = document.getElementById("tiempoPreparacion").value;
    const porciones = document.getElementById("porciones").value;
    const presupuestoPorPorcion = document
      .getElementById("presupuestoPorPorcion")
      .value;

    const ingredientesTexto = document.getElementById("ingredientes").value;
    const pasosTexto = document.getElementById("pasos").value;

    if (!titulo) {
      mensaje.textContent = "El título es obligatorio.";
      return;
    }

    // Convertir ingredientes: cada línea → objeto { nombre }
    const ingredientes = ingredientesTexto
      .split("\n")
      .map(linea => linea.trim())
      .filter(linea => linea !== "")
      .map(linea => ({
        nombre: linea // cantidad y unidad opcionales
      }));

    // Convertir pasos: cada línea → string
    const pasos = pasosTexto
      .split("\n")
      .map(linea => linea.trim())
      .filter(linea => linea !== "");

    const cuerpo = {
      titulo,
      descripcion,
      categoria,
      dificultad,
      tiempoPreparacion: tiempoPreparacion ? Number(tiempoPreparacion) : undefined,
      porciones: porciones ? Number(porciones) : undefined,
      presupuestoPorPorcion: presupuestoPorPorcion
        ? Number(presupuestoPorPorcion)
        : undefined,
      ingredientes,
      pasos
    };

    try {
      const respuesta = await fetch("http://localhost:3000/api/recetas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cuerpo)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        mensaje.textContent =
          data.mensajeError || "Error al guardar la receta.";
        return;
      }

      mensaje.textContent = "Receta creada correctamente. Redirigiendo...";

      // Opcional: redirigir después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "./recetas.html";
      }, 1500);
    } catch (error) {
      mensaje.textContent = "Error de conexión con el servidor.";
    }
  });
});