document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCrearReceta");
  const mensaje = document.getElementById("mensaje");

  if (!form) {
    console.error("No se encontró el formulario de creación de receta.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Reset del mensaje
    mensaje.textContent = "";
    mensaje.className = "fw-semibold";

    // 1. Leer valores del formulario
    const titulo = document.getElementById("titulo")?.value.trim() || "";
    const descripcion = document.getElementById("descripcion")?.value.trim() || "";
    const categoria = document.getElementById("categoria")?.value.trim() || "";
    const dificultad = document.getElementById("dificultad")?.value || "facil";
    const tiempoPreparacionValor = document.getElementById("tiempoPreparacion")?.value;
    const porcionesValor = document.getElementById("porciones")?.value;
    const presupuestoValor = document.getElementById("presupuestoPorPorcion")?.value;
    const ingredientesTexto = document.getElementById("ingredientes")?.value || "";
    const pasosTexto = document.getElementById("pasos")?.value || "";

    const errores = [];

    // 2. Validaciones

    // 2.1 Título obligatorio
    if (!titulo) {
      errores.push("El título de la receta es obligatorio.");
    }

    // 2.2 Ingredientes: al menos uno
    const ingredientesLista = ingredientesTexto
      .split(/\r?\n|,/)
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    if (ingredientesLista.length === 0) {
      errores.push("Debe ingresar al menos un ingrediente (uno por línea).");
    }

    // 2.3 Pasos: al menos uno
    const pasosLista = pasosTexto
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (pasosLista.length === 0) {
      errores.push("Debe ingresar al menos un paso (uno por línea).");
    }

    // 2.4 Tiempo de preparación (opcional, pero si lo pone debe ser > 0)
    let tiempoPreparacion = null;
    if (tiempoPreparacionValor !== "" && tiempoPreparacionValor !== null) {
      const num = Number(tiempoPreparacionValor);
      if (Number.isNaN(num) || num <= 0) {
        errores.push("El tiempo de preparación debe ser un número mayor a 0.");
      } else {
        tiempoPreparacion = num;
      }
    }

    // 2.5 Porciones (opcional, pero si lo pone debe ser > 0)
    let porciones = null;
    if (porcionesValor !== "" && porcionesValor !== null) {
      const num = Number(porcionesValor);
      if (Number.isNaN(num) || num <= 0) {
        errores.push("Las porciones deben ser un número mayor a 0.");
      } else {
        porciones = num;
      }
    }

    // 2.6 Presupuesto por porción (opcional, pero si lo pone debe ser >= 0)
    let presupuestoPorPorcion = null;
    if (presupuestoValor !== "" && presupuestoValor !== null) {
      const num = Number(presupuestoValor);
      if (Number.isNaN(num) || num < 0) {
        errores.push("El presupuesto por porción debe ser un número mayor o igual a 0.");
      } else {
        presupuestoPorPorcion = num;
      }
    }

    // 3. Si hay errores, mostrarlos y NO enviar al backend
    if (errores.length > 0) {
      mensaje.textContent = errores.join(" ");
      mensaje.classList.add("text-danger");
      return;
    }

    // 4. Construir objeto de receta para enviar al backend
    // Construir ingredientes como objetos { nombre }
   // por ahora sin cantidad/unidad
      const ingredientesObjetos = ingredientesLista.map((nombre) => ({
        nombre
     }));


    const nuevaReceta = {
      titulo,
      descripcion: descripcion || null,
      categoria: categoria || null,
      dificultad,
      tiempoPreparacion,
      porciones,
      presupuestoPorPorcion,
      ingredientes: ingredientesObjetos,
      pasos: pasosLista
    };

    console.log("Enviando nueva receta:", nuevaReceta);

    try {
      const respuesta = await fetch("http://localhost:3000/api/recetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReceta)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        mensaje.textContent =
          data.mensajeError || "Error al crear la receta. Intente de nuevo.";
        mensaje.classList.add("text-danger");
        return;
      }

      // 5. Éxito
      mensaje.textContent = "Receta creada correctamente 🎉";
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");

      // Opcional: limpiar formulario
      form.reset();

      // Opcional: redirigir al listado después de unos segundos
      // setTimeout(() => {
      //   window.location.href = "./recetas.html";
      // }, 1200);

    } catch (error) {
      console.error("Error al crear receta:", error);
      mensaje.textContent = "Error de conexión con el servidor.";
      mensaje.classList.add("text-danger");
    }
  });
});