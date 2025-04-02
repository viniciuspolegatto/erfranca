
document.addEventListener("DOMContentLoaded", function () {

let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetecAgro.json';
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
        case 40860:
          saldo = localStorage.getItem("total40860") || '';
          break;
        case 40861:
          saldo = localStorage.getItem("total40861") || '';
          break;
        case 40862:
          saldo = localStorage.getItem("total40862") || '';
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
          <td style="border: 1px solid black; padding: 8px"><a href="STecAGRO-dadosContrato.html">CONTRATAR</a></td>
          <td style="border: 1px solid black; text-align: left; padding: 8px"><a href="${produtoUnico.linkFicha}">Ficha Técnica - link</a></td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.codigoRm}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.valorSTecAgro}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.publico}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.setorAtendido}</td>
        </tr>
      `;
    });
  }
});
