// Verifica se o usuário está autenticado antes de carregar o conteúdo da página
async function checkAuth() {
  try {
    const response = await fetch('/check-auth', { method: 'GET' });
    const data = await response.json();

    if (!data.authenticated) {
      console.log('Usuário não autenticado, redirecionando para login');
      window.location.href = '/'; // Redireciona para a página de login
    } else {
      console.log('Usuário autenticado, carregando conteúdo da página home');
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
  }
}

// Verifica a autenticação ao carregar a página
checkAuth();

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
  fetch('/logout', { method: 'GET' })
    .then(() => {
      window.location.href = '/'; // Redireciona para a página inicial
    })
    .catch(error => console.error('Erro ao fazer logout:', error));
});

// Redireciona para a página restrita1
document.getElementById('restrita1Button').addEventListener('click', () => {
  window.location.href = '/restrita1.html'; // Redireciona para a página restrita1
});
