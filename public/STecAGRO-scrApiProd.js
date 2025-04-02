let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetecAgro.json';


let elementoParaListarProdutos = document.getElementById('listaDeServicos');


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
      exibirProdutosNaLista(produtos);
    }
  } catch (error) {
    // Trata qualquer erro que ocorra durante a execução
    console.error('Failed to fetch produtos:', error);
  }
}

/* ****** ESTRUTURA DA API ******************* FORMATO *******

"linkFicha":"https://drive.google.com/file/d/1cJLq6busjKoeJ8ouG4jCX9yjujXjJymj/view?usp=sharing",
"tagProduto":"Rastreabilidade de vegetais - I.N. 02/2018 (MAPA)",
"familia":"SEBRAETEC - CONSULTORIA TECNOLÓGICA 3H - Grupo: Lote 3 - PRESENCIAL",
"titulo":"Sebraetec Agro - Rastreabilidade de vegetais frescos- Instrução Normativa conjunta 02/2018 (MAPA)",
"codigoRae":2424,
"codigoRm":40860,
"valorSTecAgro":570.43,
"publico":"PRODUTOR RURAL",
"setorAtendido":"Agronegócios",
"cargaHoraria":3,
"modalidade":"PRESENCIAL"
*********************************************************** */


function exibirProdutosNaLista(produtos) {
  // Limpa o conteúdo existente
  elementoParaListarProdutos.innerHTML = '';
  
  // Adiciona a opção "----------" como a primeira opção
  elementoParaListarProdutos.innerHTML += `
    <option value="" disabled selected>-----</option>
  `;

  // Verifica se a estrutura dos dados é um array
  if (Array.isArray(produtos)) {
    produtos.forEach(produtoUnicoLista => {
      // Ajuste os nomes das propriedades conforme necessário
      elementoParaListarProdutos.innerHTML += `
        <option value="${produtoUnicoLista.familia} | ${produtoUnicoLista.titulo} | ${produtoUnicoLista.codigoRae} | ${produtoUnicoLista.codigoRm} | ${produtoUnicoLista.valorSTecAgro} | ${produtoUnicoLista.publico} | ${produtoUnicoLista.setorAtendido} | ${produtoUnicoLista.cargaHoraria} | ${produtoUnicoLista.modalidade}">${produtoUnicoLista.tagProduto} - ${produtoUnicoLista.publico} - ${produtoUnicoLista.cargaHoraria}H - ${produtoUnicoLista.modalidade}</option>
      `;
    });
  } else {
    console.error('O formato dos dados recebidos não é um array');
  }
}
