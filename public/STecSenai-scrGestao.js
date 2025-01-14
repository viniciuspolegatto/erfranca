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



// Carregar dados ao iniciar a página
carregarDados();

// Função para carregar dados existentes
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarCadastroClientes")
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados recebidos:", data);
      
          // Ordena os dados em ordem decrescente de ID
            data.sort((a, b) => b.ID - a.ID);
      
            let html = `
              <div class="table-container">
                <table>
                    <thead>
                        <tr>
                          <th>ID CLIENTE</th>
                          <th>Nome</th>
                          <th>Serviço Contratado</th>
                          <th>STARTEC Nº</th>
                          <th>Nº PASTA</th>
                          <th>STATUS</th>
                          <th>CPF</th>
                          <th>CNPJ</th>
                          <th>Razão Social</th>
                          <th>Testemunha Contrato</th>
                        </tr>
                      </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                      <th>${item.ID}</td>
                      <th>${item.NomePfSenaiST}</td>
                      <th>${item.servTituloSenaiST}</td>
                      <th>${item.procStarTec}</td>
                      <th>${item.numeroPasta}</td>
                      <th>${item.statusSTecSenai}</td>
                      <th>${item.CpfPfSenaiST}</td>
                      <th>${item.cnpjPj}</td>
                      <th>${item.razaoPj}</td>
                      <th>${item.testemunhaNomeSenaiST}</td>
                    </tr>
                `;
            });
            html += `
                    </tbody>
                </table>
              </div>
            `;
            document.querySelector("#listaClientes").innerHTML = html;

            // Exibe o corpo da página após carregar os dados
            document.body.style.display = 'block';

        })
        .catch((error) => console.error("Error ao carregar dados:", error));
}

// Função para atualizar informações do cliente
document.getElementById("AtualizarClienteStatus").addEventListener("click", () => {
    const idCliente = document.getElementById("UpdateId").value;
    const numeroProcesso = document.getElementById("UpdateNoProcessoStartec").value;
    const numeroPasta = document.getElementById("UpdatePastaServidor").value;
    const status = document.getElementById("UpdateStatusStartec").value;

    if (!idCliente) {
        swal("Erro", "O ID do Cliente precisa ser informado para atualizar as informações.", "error");
        return;
    }

    const updateData = { idCliente };

    if (numeroProcesso) {
        updateData.numeroProcesso = numeroProcesso;
    }
    if (numeroPasta) {
        updateData.numeroPasta = numeroPasta;
    }
    if (status) {
        updateData.status = status;
    }

    fetch('/atualizarCliente', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (response.ok) {
            swal("Atualização realizada com sucesso!", {
                icon: "success",
            }).then(() => {
                window.location.href = "STecSenai-gestao.html";
            });
        } else {
            swal("Erro", "Erro ao atualizar informações.", "error");
        }
    })
    .catch(error => console.error("Erro ao enviar solicitação:", error));
});


//** EXEMPLO ****************** FUNÇÃO PARA PESQUISAR E ABRIR NOVA PÁGINA *********************
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;

    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
});

