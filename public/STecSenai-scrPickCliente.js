// Script STecSenai-scrPickCliente.js para listar os CPF's cadastrados

// ********************* Verificação de autenticação *****************
function isAuthenticated() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('username=')) {
            return true;
        }
    }
    return false;
}

// Função de logout
function logout() {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = 'index.html';
}

// Redirecionamento se o usuário não está autenticado
if (!isAuthenticated()) {
    window.location.href = 'login.html';
}
// ******************************** FIM LOGIN ************************



// Função para obter os parâmetros da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const nomeCliente = getQueryParam("nomeCliente");


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
  .catch((error) => console.error("Error ao buscar detalhes:", error));



document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const idContrato = document.querySelector("#consumirSTecSenai").value;
  
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
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