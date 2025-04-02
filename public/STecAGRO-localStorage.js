document.addEventListener("DOMContentLoaded", function () {
  const dadosCnpj = JSON.parse(localStorage.getItem("dadosCnpj"));
  const cepDigitadoString = localStorage.getItem("cepDigitado");
  const cepDigitado = cepDigitadoString ? JSON.parse(cepDigitadoString) : null;
  const nomeCliente = localStorage.getItem("nomeCliente");
  const numeroResidencia = localStorage.getItem("numeroResidencia");
  const telefone = localStorage.getItem("telefone");
  const emailpessoal = localStorage.getItem("email");
  const cpfBruto = localStorage.getItem("cpfBruto");
  const servicos = localStorage.getItem("servico");
  const fantasiaPj = localStorage.getItem("fantasiaPj");
  const complementoPj = localStorage.getItem("complementoPj");
  const emailPj = localStorage.getItem("emailPj");
  const telefonePj = localStorage.getItem("telefonePj");
  
  const nomeTestemunhaSTecAgro = localStorage.getItem("testemunhaNome");
  const cargoTestemunhaSTecAgro = localStorage.getItem("testemunhaCargo")
  const cpfTestemunhaSTecAgro = localStorage.getItem("testemunhaCpf");
  
  const servicoSTecAgroFamilia = localStorage.getItem('servicoFamilia');
  const servicoSTecAgroTitulo  =  localStorage.getItem('servicoTitulo');
  const servicoSTecAgroRae = localStorage.getItem('servicoRae');
  const servicoSTecAgroRM =  localStorage.getItem('servicoRM');
  const servicoSTecAgroQhora = localStorage.getItem('servicoQhora');
  const servicoSTecAgroValor = localStorage.getItem('servicoValor');
  
  
// ****************** MONTANDO O TEXTO DA PARTE CONTRATANTE ******************************
  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <p style="text-align: justify;">
      ${dadosCnpj.nome}, nome fantasia ${fantasiaPj}, inscrita no CNPJ nº ${dadosCnpj.cnpj}, localizada à ${dadosCnpj.logradouro}, nº ${dadosCnpj.numero}${complementoPj},
      bairro ${dadosCnpj.bairro}, no município de ${dadosCnpj.municipio} - SP, CEP: ${dadosCnpj.cep}, telefone(s) ${telefonePj},
      e-mail ${emailPj}, empresa neste ato representada por ${nomeCliente}, brasileiro(a), Empresário(a)/Autônomo(a) com 
      inscrição no CPF nº ${cpfBruto}, residente à ${cepDigitado.logradouro}, nº ${numeroResidencia}, bairro ${cepDigitado.bairro},
      CEP ${cepDigitado.cep}, na cidade de ${cepDigitado.localidade} - ${cepDigitado.uf}, telefone de contato ${telefone} e e-mail
      pessoal ${emailpessoal}, denominado(a) como <b>CONTRATANTE</b>
    </p>
  `;

  const reportProduto = document.getElementById("reportProduto");
  reportProduto.innerHTML = `
    <p style="text-align: justify;">
    Produto específico da prestação dos serviços: ${servicoSTecAgroFamilia} - ${servicoSTecAgroTitulo} - RAE Nº ${servicoSTecAgroRae}
    </p>
  `;
  
  const clienteAssinante = document.getElementById("clienteAssinante");
  clienteAssinante.innerHTML = `
    <p style="margin: 0.15em 0;">CONTRATANTE / EMPRESA</p>
    <p style="margin: 0.15em 0;">${nomeCliente}</p>
    <p style="margin: 0.15em 0;">${cpfBruto}</p>
  `;

  const testemunhaAssinante = document.getElementById("testemunhaAssinante");
  testemunhaAssinante.innerHTML = `
     <p style="margin: 0.15em 0;">${nomeTestemunhaSTecAgro}</p>
      <p style="margin: 0.15em 0;">${cargoTestemunhaSTecAgro}</p>
      <p style="margin: 0.15em 0;">${cpfTestemunhaSTecAgro}</p>
  `;

  
// Obtém a data atual
const dataHoje = new Date();
// Cria uma nova data baseada na data atual
const dataFuturaInicio = new Date(dataHoje);
const dataFuturaFim = new Date(dataHoje);
// Adiciona 30 dias à nova data
dataFuturaInicio.setDate(dataFuturaInicio.getDate() + 15);
dataFuturaFim.setDate(dataFuturaFim.getDate() + 75);
// Obtém o dia, o mês e o ano da nova data
const diaInicio = dataFuturaInicio.getDate();
const diaFim = dataFuturaFim.getDate();
const mesInicio = dataFuturaInicio.getMonth() + 1; // Meses começam do 0, então adiciona 1
const mesFim = dataFuturaFim.getMonth() + 1; // Meses começam do 0, então adiciona 1
const anoInicio = dataFuturaInicio.getFullYear();
const anoFim = dataFuturaFim.getFullYear();
// Formata a data como texto
const dataFormatadaInicio = `${diaInicio}/${mesInicio}/${anoInicio}`;
const dataFormatadaFim = `${diaFim}/${mesFim}/${anoFim}`;


  const descritivoSebraetecAgro = document.getElementById("descritivoSebraetecAgro");
  descritivoSebraetecAgro.innerHTML = `
    <p style="margin: 0.15em 0;">SERVIÇO: SEBRAETEC - Consultoria Tecnológica - Presencial</p>
    <p style="margin: 0.15em 0;">Descritivo do serviço: ${servicoSTecAgroTitulo}</p>
    <p style="margin: 0.15em 0;">Produto: RAE ${servicoSTecAgroRae} - ${servicoSTecAgroFamilia}</p>
    <p style="margin: 0.15em 0;">Carga Horária: ${servicoSTecAgroQhora} h</p>
    <p style="margin: 0.15em 0;">Período: Início em ${dataFormatadaInicio} e fim estimado em ${dataFormatadaFim}</p>
    <p style="margin: 0.15em 0;">Local: Presencial</p>
  `;
  
  
  function formatarDataAtual() {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mesIndex = hoje.getMonth();
  const ano = hoje.getFullYear();

  // Array com os nomes dos meses
  const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  // Obtém o nome do mês usando o índice
  const nomeMes = nomesMeses[mesIndex];
  return `São Paulo, ${dia} de ${nomeMes} de ${ano}`;
  }
  // Obtém o elemento onde a data será exibida
  const elementoData = document.getElementById("dataAtual");
  // Define o texto do elemento como a data formatada
  elementoData.textContent = formatarDataAtual();
  
  
  
  const tabelaPrecoForma = document.getElementById("tabelaPrecoForma");
  tabelaPrecoForma.innerHTML = `
  
    <div>
        <table style="border: 1px solid black; padding: 1rem; text-align: center; border-collapse: collapse; width: 100%">
          <tr>
           <td style="border: 1px solid black; padding: 8px"><b>VALOR TOTAL</b></td>
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecAgroValor)}</td>
        </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>VALOR SUBSIDIADO PELO SEBRAE</b></td>
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecAgroValor * 0.7).toFixed(2)}</td>
       </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>VALOR PAGO PELO CLIENTE</b></td>
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecAgroValor * 0.3).toFixed(2)}</td>
       </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>FORMA DE PAGAMENTO</b></td>
           <td style="border: 1px solid black; padding: 8px">OBSERVAÇÕES</td> 
       </tr>
      </table>
    </div>
  `;


  document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});
