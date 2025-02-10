async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
        window.location.href = "home.html";
    } else {
        document.getElementById("error").innerText = "Login inválido!";
    }
}
