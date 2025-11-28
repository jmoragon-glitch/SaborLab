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
      console.log("Respuesta de /login:", data);

      if (!response.ok) {
        mensaje.textContent = data.mensajeError || "Error al iniciar sesión";
        mensaje.classList.add("text-danger");
        return;
      }

      // 👇 AQUÍ está el cambio importante:
      // Si el backend responde { mensaje, usuario }, tomamos data.usuario.
      // Si en algún momento responde solo el usuario, usamos data directamente.
      const usuario = data.usuario ?? data;

      // Guardar SOLO el usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirigir a inicio
      window.location.href = "./index.html";

    } catch (error) {
      console.error("Error en login:", error);
      mensaje.textContent = "Error de conexión con el servidor.";
      mensaje.classList.add("text-danger");
    }
  });
});