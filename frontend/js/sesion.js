document.addEventListener("DOMContentLoaded", () => {
  console.log("sesion.js cargado ✅");

  // 1. Leer usuario desde localStorage
  let usuario = null;
  try {
    const guardado = localStorage.getItem("usuario");
    if (guardado) {
      usuario = JSON.parse(guardado);
    }
  } catch (e) {
    console.error("No se pudo leer usuario de localStorage:", e);
  }

  console.log("Usuario en sesión (si hay):", usuario);

  // 2. Detectar en qué página estamos
  const path = window.location.pathname || "";
  const esPaginaCrearReceta =
    path.endsWith("/crear-receta.html") || path.endsWith("crear-receta.html");

  // 3. PROTECCIÓN DE RUTA: crear-receta solo para usuarios chef
  if (esPaginaCrearReceta) {
    // Si NO hay sesión → mandar al login
    if (!usuario) {
      console.log(
        "Acceso bloqueado a crear-receta: sin sesión. Redirigiendo a login."
      );
      window.location.href = "/login.html";
      return; // importante: detener ejecución aquí
    }

    // Si hay sesión pero NO es chef → mandar al inicio
    if (usuario.rol !== "chef") {
      console.log(
        "Acceso bloqueado a crear-receta: usuario no es chef. Redirigiendo a inicio."
      );
      window.location.href = "/index.html";
      return;
    }
  }

  // 4. Buscar elementos del navbar
  const navLogin = document.getElementById("navLogin");
  const navUsuario = document.getElementById("navUsuario");
  const navUserName = document.getElementById("navUserName");
  const navCrearReceta = document.getElementById("navCrearReceta");
  const btnLogout = document.getElementById("btnLogout");

  console.log("navLogin:", navLogin);
  console.log("navUsuario:", navUsuario);
  console.log("navCrearReceta:", navCrearReceta);

  if (usuario) {
    console.log("Ajustando navbar para usuario autenticado…");

    // Mostrar menú de usuario
    if (navUsuario) {
      navUsuario.classList.remove("d-none");
    }

    // Ocultar "Iniciar sesión"
    if (navLogin) {
      navLogin.classList.add("d-none");
    }

    // Poner el nombre en el navbar
    if (navUserName) {
      navUserName.textContent = usuario.nombreCompleto || "Usuario";
    }

    // 🔹 Esta condición es la clave:
    // SOLO ocultar "Crear receta" si SÍ hay usuario y NO es chef.
    if (navCrearReceta && usuario.rol !== "chef") {
      navCrearReceta.classList.add("d-none");
    }

    // Cerrar sesión
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "/index.html";
      });
    }
  } else {
    console.log("No hay usuario en sesión, mostrando botón de login.");

    // Sin sesión: mostrar login, ocultar menú de usuario
    if (navLogin) {
      navLogin.classList.remove("d-none");
    }
    if (navUsuario) {
      navUsuario.classList.add("d-none");
    }

    // Aquí puedes decidir si ocultar o no "Crear receta" para no logueados.
    // Por ahora lo dejamos visible y confiamos en la protección de ruta.
  }
});