let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetec.json';


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

"linkFicha": "https://datasebrae.com.br/wp-content/uploads/2020/09/Framework-OKR-para-Otimizac%CC%A7a%CC%83o-de-Processos-MMP14065-1.pdf",
"tagProduto": "Framework OKR para otimização de processo",
"familia": "SEBRAETEC - CONSULTORIA TECNOLÓGICA 4H - PRESENCIAL",
"titulo": "Sebraetec Senai - Framework OKR para otimização de processos",
"codigoRae": 4727,
"codigoRm": 42567,
"valorSTecSenai": 770.00,
"publico": "ME / EPP",
"setorAtendido": "Ind./Com./Serv.",
"cargaHoraria": 4,
"modalidade": "PRESENCIAL"
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
        <option value="${produtoUnicoLista.familia} | ${produtoUnicoLista.titulo} | ${produtoUnicoLista.codigoRae} | ${produtoUnicoLista.codigoRm} | ${produtoUnicoLista.valorSTecSenai} | ${produtoUnicoLista.publico} | ${produtoUnicoLista.setorAtendido} | ${produtoUnicoLista.cargaHoraria} | ${produtoUnicoLista.modalidade}">${produtoUnicoLista.tagProduto} - ${produtoUnicoLista.publico} - ${produtoUnicoLista.cargaHoraria}H - ${produtoUnicoLista.modalidade}</option>
      `;
    });
  } else {
    console.error('O formato dos dados recebidos não é um array');
  }
}
