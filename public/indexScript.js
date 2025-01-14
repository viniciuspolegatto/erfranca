/* -- ************************************************************ -->
<!-- ************************************************************* -->
<!-- ******** ESPAÇO PARA ALTERAR SALDO DE PRODUTOS DO ER ******** -->
<!-- ************************************************************* -->
<!-- *************************************************************  */

function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado lá no banco de dados
      const contador42567 = data.filter(
        (item) => item.servRMSenaiST === "42567"
      ).length;

      const contador42568 = data.filter(
        (item) => item.servRMSenaiST === "42568"
      ).length;

      const contador40864 = data.filter(
        (item) => item.servRMSenaiST === "40864"
      ).length;

      const contador40865 = data.filter(
        (item) => item.servRMSenaiST === "40865"
      ).length;

      const contador40866 = data.filter(
        (item) => item.servRMSenaiST === "40866"
      ).length;

      const contador42569 = data.filter(
        (item) => item.servRMSenaiST === "42569"
      ).length;
    
      const contador40867 = data.filter(
        (item) => item.servRMSenaiST === "40867"
      ).length;

      const contador40868 = data.filter(
        (item) => item.servRMSenaiST === "40868"
      ).length;

      const contador40869 = data.filter(
        (item) => item.servRMSenaiST === "40869"
      ).length;
  
      const contador40863R = data.filter(
        (item) => item.servRMSenaiST === "40863-"
      ).length;

      const contador41123R = data.filter(
        (item) => item.servRMSenaiST === "41123-"
      ).length;
  
      const contador40864R = data.filter(
        (item) => item.servRMSenaiST === "40864-"
      ).length;

      const contador42570R = data.filter(
        (item) => item.servRMSenaiST === "42570-"
      ).length;

      const contador40865R = data.filter(
        (item) => item.servRMSenaiST === "40865-"
      ).length;
    
      const contador40867R = data.filter(
        (item) => item.servRMSenaiST === "40867-"
      ).length;

      const contador40869R = data.filter(
        (item) => item.servRMSenaiST === "40869-"
      ).length; 

    
      // Do contador é substituído o saldo inicial
      let total42567 = 0;
      let total42568 = 0;
      let total40864 = 0;
      let total40865 = 0;
      let total40866 = 0;
      let total42569 = 0;
      let total40867 = 0;
      let total40868 = 0;
      let total40869 = 0;    
      let total40863R = 0;
      let total41123R = 0;
      let total40864R = 0;
      let total42570R = 0;
      let total40865R = 0;
      let total40867R = 0;
      let total40869R = 0;   

    
    /*
          let total42567 = 55 - contador42567;
      let total42568 = 12 - contador42568;
      let total40864 = 0 - contador40864;
      let total40865 = 0 - contador40865;
      let total40866 = 1 - contador40866;
      let total42569 = 6 - contador42569;
      let total40867 = 0 - contador40867;
      let total40868 = 4 - contador40868;
      let total40869 = 0 - contador40869;    
      let total40863R = 13 - contador40863R;
      let total41123R = 19 - contador41123R;
      let total40864R = 1 - contador40864R;
      let total42570R = 10 - contador42570R;
      let total40865R = 4 - contador40865R;
      let total40867R = 1 - contador40867R;
      let total40869R = 5 - contador40869R;
    */
    
      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome42567").textContent = total42567;
      document.querySelector("#contadorNome42568").textContent = total42568;
      document.querySelector("#contadorNome40864").textContent = total40864;
      document.querySelector("#contadorNome40865").textContent = total40865;
      document.querySelector("#contadorNome40866").textContent = total40866;
      document.querySelector("#contadorNome42569").textContent = total42569;
      document.querySelector("#contadorNome40867").textContent = total40867;
      document.querySelector("#contadorNome40868").textContent = total40868; 
      document.querySelector("#contadorNome40869").textContent = total40869;
      document.querySelector("#contadorNome40863R").textContent = total40863R;
      document.querySelector("#contadorNome41123R").textContent = total41123R;
      document.querySelector("#contadorNome40864R").textContent = total40864R;
      document.querySelector("#contadorNome42570R").textContent = total42570R;
      document.querySelector("#contadorNome40865R").textContent = total40865R;
      document.querySelector("#contadorNome40867R").textContent = total40867R;
      document.querySelector("#contadorNome40869R").textContent = total40869R;
 
      // Armazenar os dados no localStorage para ser usado na nova janela de contrato
      localStorage.setItem('total42567', total42567);
      localStorage.setItem('total42568', total42568);
      localStorage.setItem('total40864', total40864);
      localStorage.setItem('total40865', total40865);
      localStorage.setItem('total40866', total40866);
      localStorage.setItem('total42569', total42569);
      localStorage.setItem('total40867', total40867);
      localStorage.setItem('total40868', total40868);
      localStorage.setItem('total40869', total40869);
      localStorage.setItem('total40863R', total40863R);
      localStorage.setItem('total41123R', total41123R);
      localStorage.setItem('total40864R', total40864R);
      localStorage.setItem('total42570R', total42570R);    
      localStorage.setItem('total40865R', total40865R);
      localStorage.setItem('total40867R', total40867R);
      localStorage.setItem('total40869R', total40869R);
    
  
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));


  fetch("/buscarCadastroClientesAgro")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado lá no banco de dados
      const contador40860 = data.filter(
        (item) => item.servRMSenaiST === "40860"
      ).length;

      const contador40861 = data.filter(
        (item) => item.servRMSenaiST === "40861"
      ).length;
    
      const contador40862 = data.filter(
        (item) => item.servRMSenaiST === "40862"
      ).length;
    
      // Do contador é substituído o saldo inicial
      let total40860 = 0;
      let total40861 = 0;
      let total40862 = 0; 
/*
      let total40860 = 39 - contador40860;
      let total40861 = 0 - contador40861;
      let total40862 = 41 - contador40862; 
*/
    
      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome40860").textContent = total40860;
      document.querySelector("#contadorNome40861").textContent = total40861;
      document.querySelector("#contadorNome40862").textContent = total40862;

      // Armazenar os dados no localStorage para ser usado na nova janela de contrato
      localStorage.setItem('total40860', total40860);
      localStorage.setItem('total40861', total40861);
      localStorage.setItem('total40862', total40862);
    
  
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));

}

// Chama a função para carregar os dados ao iniciar a página
carregarDados();
