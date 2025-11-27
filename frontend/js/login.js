document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  const mensaje = document.getElementById("mensaje");

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        mensaje.textContent = data.mensajeError || "Error al iniciar sesión";
        mensaje.classList.add("text-danger");
        return;
      }

      // Guardar sesión en localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      // Redirigir a inicio
      window.location.href = "./index.html";

    } catch (error) {
      console.error("Error en login:", error);
      mensaje.textContent = "Error de conexión con el servidor.";
      mensaje.classList.add("text-danger");
    }
  });
});