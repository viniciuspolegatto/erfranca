document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json(); // Parseia a resposta JSON
    if (data.success) {
      window.location.href = data.redirect; // Redireciona para a página home
    } else {
      alert(data.message); // Exibe a mensagem de erro
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
});