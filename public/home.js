document.getElementById('logoutButton').addEventListener('click', () => {
  fetch('/logout', { method: 'GET' })
    .then(() => {
      window.location.href = '/'; // Redireciona para a página inicial
    })
    .catch(error => console.error('Erro ao fazer logout:', error));
});

document.getElementById('restrita1Button').addEventListener('click', () => {
  window.location.href = '/restrita1'; // Redireciona para a página restrita1
});