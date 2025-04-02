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
      carregarDados();
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
                      <td>${item.ID}</td>
                      <td>${item.NomePfSenaiST}</td>
                      <td>${item.servTituloSenaiST}</td>
                      <td>${item.procStarTec}</td>
                      <td>${item.numeroPasta}</td>
                      <td>${item.statusSTecSenai}</td>
                      <td>${item.CpfPfSenaiST}</td>
                      <td>${item.cnpjPj}</td>
                      <td>${item.razaoPj}</td>
                      <td>${item.testemunhaNomeSenaiST}</td>
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
        .catch((error) => console.error("Erro ao carregar dados:", error));
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
