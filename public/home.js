async function checkAuth() {
    const response = await fetch("/check-auth");
    const data = await response.json();
    
    if (!data.authenticated) {
        window.location.href = "/index.html";
    }
}

async function logout() {
    await fetch("/logout");
    window.location.href = "/index.html";
}

async function goToRestrita() {
    window.location.href = "/restrita1.html";
}

checkAuth();
