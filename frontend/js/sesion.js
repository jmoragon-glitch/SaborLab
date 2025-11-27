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

  // 2. Buscar elementos del navbar
  const navLogin = document.getElementById("navLogin");
  const navUsuario = document.getElementById("navUsuario");
  const navUserName = document.getElementById("navUserName");
  const navCrearReceta = document.getElementById("navCrearReceta");
  const btnLogout = document.getElementById("btnLogout");

  if (usuario) {
    console.log("Usuario en sesión:", usuario);

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

    // Si NO es chef, ocultar "Crear receta"
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
  }
});