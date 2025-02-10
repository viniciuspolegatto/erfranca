document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        document.cookie = `user=${username}; path=/`; // Armazena o cookie
        alert("Login bem-sucedido!");
        window.location.href = "home.html";
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar ao servidor");
    }
  });
});
