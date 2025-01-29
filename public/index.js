// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
document.getElementById('botaoGerarContrato').addEventListener('click', async function() {

  // Captura os valores dos selects
  let solicitante = document.getElementById("listaDeTestemunhas").value;
  let nomeProjeto = document.getElementById("nomeProj").value;

  // Formatação do corpo do e-mail
  let emailBody = `
  Prezada equipe SOMA - CREDENCIAMENTO,

  Solicito processamento do pedido abaixo para atendimento da empresa conforme descrito abaixo:

  **** DETALHES DO PEDIDO ****
  Solicitante: ${solicitante}
  Projeto: ${nomeProjeto}

  Agradeço pela atenção.
  `;

  console.log(emailBody);

  try {
    // Realiza a requisição fetch dentro do bloco try
    const response = await fetch('/enviarEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailBody }),
    });

    if (response.ok) {
      alert('E-mail enviado com sucesso!');
    } else {
      alert('Erro ao enviar o e-mail.');
    }
  } catch (error) {
    // Caso haja erro, é capturado aqui no catch
    console.error('Erro na solicitação de envio de e-mail:', error);
    alert('Erro ao enviar o e-mail.');
  }
});