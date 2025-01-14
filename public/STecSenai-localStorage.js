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
  
  const nomeTestemunhaSTecSenai = localStorage.getItem("testemunhaNome");
  const cargoTestemunhaSTecSenai = localStorage.getItem("testemunhaCargo")
  const cpfTestemunhaSTecSenai = localStorage.getItem("testemunhaCpf");
  
  const servicoSTecSenaiFamilia = localStorage.getItem('servicoFamilia');
  const servicoSTecSenaiTitulo  =  localStorage.getItem('servicoTitulo');
  const servicoSTecSenaiRae = localStorage.getItem('servicoRae');
  const servicoSTecSenaiRM =  localStorage.getItem('servicoRM');
  const servicoSTecSenaiQhora = localStorage.getItem('servicoQhora');
  const servicoSTecSenaiValor = localStorage.getItem('servicoValor');
  
  
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


  
  const clienteAssinante = document.getElementById("clienteAssinante");
  clienteAssinante.innerHTML = `
    <p style="margin: 0.15em 0;">CONTRATANTE / EMPRESA</p>
    <p style="margin: 0.15em 0;">${nomeCliente}</p>
    <p style="margin: 0.15em 0;">${cpfBruto}</p>
  `;

  const testemunhaAssinante = document.getElementById("testemunhaAssinante");
  testemunhaAssinante.innerHTML = `
     <p style="margin: 0.15em 0;">${nomeTestemunhaSTecSenai}</p>
      <p style="margin: 0.15em 0;">${cargoTestemunhaSTecSenai}</p>
      <p style="margin: 0.15em 0;">${cpfTestemunhaSTecSenai}</p>
  `;
  
// Obtém a data atual
const dataHoje = new Date();
// Cria uma nova data baseada na data atual
const dataAtual = new Date(dataHoje)
const dataFuturaInicio = new Date(dataHoje);
const dataFuturaFim = new Date(dataHoje);
// Adiciona 30 dias à nova data
dataAtual.setDate(dataAtual.getDate());
dataFuturaInicio.setDate(dataFuturaInicio.getDate() + 15);
dataFuturaFim.setDate(dataFuturaFim.getDate() + 75);
// Obtém o dia, o mês e o ano da nova data
const diaAtual = dataAtual.getDate();
const diaInicio = dataFuturaInicio.getDate();
const diaFim = dataFuturaFim.getDate();
const mesAtual = dataAtual.getMonth()+1; // Meses começam do 0, então adiciona 1
const mesInicio = dataFuturaInicio.getMonth() + 1; // Meses começam do 0, então adiciona 1
const mesFim = dataFuturaFim.getMonth() + 1; // Meses começam do 0, então adiciona 1
const anoAtual = dataAtual.getFullYear();
const anoInicio = dataFuturaInicio.getFullYear();
const anoFim = dataFuturaFim.getFullYear();
// Formata a data como texto
const dataFormatadaHoje = `${diaAtual}/${mesAtual}/${anoAtual}`;
const dataFormatadaInicio = `${diaInicio}/${mesInicio}/${anoInicio}`;
const dataFormatadaFim = `${diaFim}/${mesFim}/${anoFim}`;


const descritivoSebraetecSenai = document.getElementById("descritivoSebraetecSenai");
  descritivoSebraetecSenai.innerHTML = `
    <p style="margin: 0.15em 0;">SERVIÇO: SEBRAETEC - Consultoria Tecnológica - Presencial</p>
    <p style="margin: 0.15em 0;">Descritivo do serviço: ${servicoSTecSenaiTitulo}</p>
    <p style="margin: 0.15em 0;">Produto: RAE ${servicoSTecSenaiRae} - ${servicoSTecSenaiFamilia}</p>
    <p style="margin: 0.15em 0;">Carga Horária: ${servicoSTecSenaiQhora} h</p>
    <p style="margin: 0.15em 0;">Período: Início previsto em ${dataFormatadaInicio} e fim estimado em ${dataFormatadaFim}</p>
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
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecSenaiValor)}</td>
        </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>VALOR SUBSIDIADO PELO SEBRAE</b></td>
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecSenaiValor * 1).toFixed(2)}</td>
       </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>VALOR PAGO PELO CLIENTE</b></td>
           <td style="border: 1px solid black; padding: 8px">R$ ${(servicoSTecSenaiValor * 0).toFixed(2)}</td>
       </tr>
        <tr>
           <td style="border: 1px solid black; padding: 8px"><b>FORMA DE PAGAMENTO</b></td>
           <td style="border: 1px solid black; padding: 8px">Contrato realizado em ${dataFormatadaHoje}, contemplado por 100% de subsídio conforme diretrizes da UTS</td> 
       </tr>
      </table>
    </div>
  `;


  document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});