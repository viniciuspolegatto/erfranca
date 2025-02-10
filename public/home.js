async function checkAuth() {
    const res = await fetch("/auth");
    if (!res.ok) {
        window.location.href = "index.html";
    }
}
checkAuth();

function logout() {
    fetch("/logout", { method: "POST" }).then(() => {
        window.location.href = "index.html";
    });
}

function irParaRestrita() {
    window.location.href = "restrita1.html";
}
