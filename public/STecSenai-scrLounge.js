
document.addEventListener("DOMContentLoaded", function () {

let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetec.json';
let elementoParaInserirProdutos = document.getElementById('tabela_produtos');


// Chama a função diretamente
buscarProdutos();

async function buscarProdutos() {
  try {
    let res = await fetch(endpoint);
    if (!res.ok) {
      // Se a resposta não for bem-sucedida, lança um erro
      throw new Error('Network response was not ok');
    } else {
      // Se a resposta for bem-sucedida
      let produtos = await res.json();
      exibirProdutosNaTela(produtos);
    }
  } catch (error) {
    // Trata qualquer erro que ocorra durante a execução
    console.error('Failed to fetch produtos:', error);
  }
}


 function exibirProdutosNaTela(produtos) {
    produtos.forEach(produtoUnico => {
      // Verifica o códigoRm do produto atual
      let saldo;
      switch (produtoUnico.codigoRm) {
        case 42567:
          saldo = localStorage.getItem("total42567") || '';
          break;
        case 42568:
          saldo = localStorage.getItem("total42568") || '';
          break;
        case 40864:
          saldo = localStorage.getItem("total40864") || '';
          break;
        case 40865:
          saldo = localStorage.getItem("total40865") || '';
          break;
        case 40866:
          saldo = localStorage.getItem("total40866") || '';
          break;
        case 42569:
          saldo = localStorage.getItem("total42569") || '';
          break;
        case 40867:
          saldo = localStorage.getItem("total40867") || '';
          break;
        case 40868:
          saldo = localStorage.getItem("total40868") || '';
          break;
        case 40869:
          saldo = localStorage.getItem("total40869") || '';
          break;
        case "40863-":
          saldo = localStorage.getItem("total40863R") || '';
          break;
        case "41123-":
          saldo = localStorage.getItem("total41123R") || '';
          break;
        case "40864-":
          saldo = localStorage.getItem("total40864R") || '';
          break;
        case "42570-":
          saldo = localStorage.getItem("total42570R") || '';
          break;
        case "40865-":
          saldo = localStorage.getItem("total40865R") || '';
          break;
        case "40867-":
          saldo = localStorage.getItem("total40867R") || '';
          break;
        case "40869-":
          saldo = localStorage.getItem("total40869R") || '';
          break;
        default:
          saldo = '';
      }


      // Monta a linha da tabela com os dados do produto
      elementoParaInserirProdutos.innerHTML += `
        <tr>
          <td style="border: 1px solid black; padding: 8px">${saldo}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.titulo}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.cargaHoraria}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.modalidade}</td>
          <td style="border: 1px solid black; padding: 8px"><a href="STecSenai-dadosContrato.html">CONTRATAR</a></td>
          <td style="border: 1px solid black; text-align: left; padding: 8px"><a href="${produtoUnico.linkFicha}">Ficha Técnica - link</a></td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.codigoRm}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.valorSTecSenai}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.publico}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.setorAtendido}</td>
        </tr>
      `;
    });
  }
});
