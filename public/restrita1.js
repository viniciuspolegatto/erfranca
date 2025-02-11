document.getElementById('logoutButton').addEventListener('click', () => {
  fetch('/logout', { method: 'GET' })
    .then(() => {
      window.location.href = '/'; // Redireciona para a página inicial
    })
    .catch(error => console.error('Erro ao fazer logout:', error));
});

document.getElementById('homeButton').addEventListener('click', () => {
  window.location.href = '/home'; // Redireciona para a página home
});