// Aguarda o DOM ser completamente carregado antes de executar qualquer código
document.addEventListener("DOMContentLoaded", () => {
  
  // ********************* Verificação de autenticação *****************
  async function checkAuth() {
    try {
      const response = await fetch('/check-auth', { method: 'GET' });
      const data = await response.json();

      if (!data.authenticated) {
        console.log('Usuário não autenticado, redirecionando para login');
        window.location.href = '/login.html'; // Redireciona para a página de login
      } else {
        console.log('Usuário autenticado, carregando conteúdo da página home');

        // Após autenticação bem-sucedida, inicializa os eventos da página
        initializePage();
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    }
  }

  // Função para inicializar eventos da página após autenticação
  function initializePage() {
    
    // Logout
    document.getElementById('logout').addEventListener('click', () => {
      fetch('/logout', { method: 'GET' })
        .then(() => {
          window.location.href = '/'; // Redireciona para a página inicial
        })
        .catch(error => console.error('Erro ao fazer logout:', error));
    });

    // Função para obter os parâmetros da URL
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    const nomeCliente = getQueryParam("nomeCliente");

    if (nomeCliente) {
      fetch(`/buscarPorNome/${nomeCliente}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Detalhes recebidos:", data);
          let html = "<ul>";
          data.forEach((item) => {
            html += `
            <li>ID_Contrato: ${item.ID_Contrato} <b>||</b> TESTEMUNHA: ${item.testemunhaNomeSenaiST} <b>||</b> RAE: ${item.servRaeSenaiST}
            <br><b>||</b> SERVIÇO: ${item.servTituloSenaiST}
            <br><b>||</b> CLIENTE: ${item.NomePfSenaiST} <b>||</b> MUNICIPIO: ${item.municipioPfSenaiST} <b>||</b> TELEFONE PF: ${item.telefonePfSenaiST} <b>||</b> E-MAIL: ${item.emailPfSenaiST}
            <br><b>||</b> CNPJ: ${item.cnpjPj} <b>||</b> RAZÃO SOC. ${item.razaoPj}  <p /> </li>`;
          });
          html += "</ul>";
          document.querySelector("#resultados").innerHTML = html;
        })
        .catch((error) => console.error("Erro ao buscar detalhes:", error));
    }

    // Adiciona evento para consumir saldo
    document.querySelector("#consumirPickCliente").addEventListener("click", function () {
      const idContrato = document.querySelector("#consumirSTecSenai").value;
      window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
    });

  }

  // Verifica a autenticação ao carregar a página
  checkAuth();

});



/* *********************************** Versão para buscar por CPF ** - Edite no Server.js e no STecSenai - scrConsumir.js
const cpf = getQueryParam("cpf");

fetch(`/buscarPorCpf/${cpf}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Detalhes recebidos:", data);
    let html = "<ul>";
    data.forEach((item) => {
      html += `
      <li>ID_Contrato: ${item.ID_Contrato} <b>||</b> TESTEMUNHA: ${item.testemunhaNomeSenaiST} <b>||</b> RAE: ${item.servRaeSenaiST}
      <br><b>||</b> SERVIÇO: ${item.servTituloSenaiST}
      <br><b>||</b> CLIENTE: ${item.NomePfSenaiST} <b>||</b> MUNICIPIO: ${item.municipioPfSenaiST} <b>||</b> TELEFONE PF: ${item.telefonePfSenaiST} <b>||</b> E-MAIL: ${item.emailPfSenaiST}
      <br><b>||</b> CNPJ: ${item.cnpjPj} <b>||</b> RAZÃO SOC. ${item.razaoPj}  <p /> </li>`;
    });
    html += "</ul>";
    document.querySelector("#resultados").innerHTML = html;
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));

document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const idContrato = document.querySelector("#consumirSTecSenai").value;
  
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
});
******************************************************************************************************************** */