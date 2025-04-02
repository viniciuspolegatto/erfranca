// ********************* Verificação de autenticação *****************
// Verifica se o usuário está autenticado antes de carregar o conteúdo da página
async function checkAuth() {
  try {
    const response = await fetch('/check-auth', { method: 'GET' });
    const data = await response.json();

    if (!data.authenticated) {
      console.log('Usuário não autenticado, redirecionando para login');
      window.location.href = '/login.html'; // Redireciona para a página de login
    } else {
      console.log('Usuário autenticado, carregando conteúdo da página home');
      // Chama a função para carregar dados APÓS a autenticação ser confirmada
      carregarDados(); // Carregar os dados depois que a senha for verificada
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
  window.location.href = '/restrita1'; // Redireciona para a página restrita1 (sem .html)
});
// ******************************** FIM LOGIN ************************



// Função para carregar dados existentes
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarContrato")
        .then((response) => response.json())
        .then((data) => {
  
      // Ordena os dados em ordem decrescente do ID_Contrato
            data.sort((a, b) => b.ID_Contrato - a.ID_Contrato);      
      
            console.log("Dados recebidos:", data);
            let html = `
              <div class="table-container">
                <table>
                    <thead>
                        <tr>
                          <th>ID Contrato</th>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Município</th>
                          <th>Telefone</th>
                          <th>Razão Social</th>
                          <th>Nome Fantasia</th>
                          <th>Município PJ</th>
                          <th style="width: 200px;">Telefone PJ</th>
                          <th>E-mail Pessoal</th>                        

                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                      <td>${item.ID_Contrato}</td>
                      <td>${item.NomePfSenaiST}</td>
                      <td>${item.CpfPfSenaiST}</td>
                      <td>${item.municipioPfSenaiST}</td>
                      <td>${item.telefonePfSenaiST}</td>
                      <td>${item.razaoPj}</td>
                      <td>${item.fantasiaPj}</td>
                      <td>${item.municipioPj}</td>
                      <td style="width: 200px;">${item.telefonePj}</td>
                      <td>${item.emailPfSenaiST}</td>
                     </tr>
                `;
            });
            html += `
                </tbody>
            </table>
            </div>
            `;
            document.querySelector("#listaDados").innerHTML = html;
        })
        .catch((error) => console.error("Error ao carregar dados:", error));
}



// Adiciona o evento de clique no botão de pesquisa
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const nomeCliente = document.querySelector("#nomeBusca").value;

    // Verifica se o comprimento do nomeCliente é pelo menos 3 caracteres
    if (nomeCliente.length < 3) {
        alert("A busca deve conter pelo menos 3 caracteres.");
        return; // Impede a navegação para a nova página
    }

    // Caso o nomeCliente tenha 3 ou mais caracteres, continua com a navegação
    window.location.href = `/STecSenai-pickCliente.html?nomeCliente=${encodeURIComponent(nomeCliente)}`;
});


/* *********************** Rota para buscar por CPF - Edite no Server.js e no STecSenai - scrPickCliente.js também ***********
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;
  
    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
  });

***************************************************************************************************************** */