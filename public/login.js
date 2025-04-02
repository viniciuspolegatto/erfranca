document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json(); // Parseia a resposta JSON
    if (data.success) {
      window.location.href = data.redirect; // Redireciona para a página home
    } else {
      alert(data.message); // Exibe a mensagem de erro
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
});






/*

// Abrir o modal de login
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

// Função de login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de verificação das credenciais
    if (username === '123' && password === '123') {
        document.cookie = 'username=' + username + '; path=/';
        window.location.href = 'STecSenai-gestao.html';
    } else {
        alert('Usuário ou senha inválidos');
    }
}

// Função para cancelar o login e redirecionar para index.html
function cancelLogin() {
    window.location.href = 'index.html';
}

// Verificação de autenticação
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

// Redirecionamento se o usuário já está autenticado
if (isAuthenticated()) {
    window.location.href = 'STecSenai-gestao.html';
}



/* =&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FUTURO &&&&&&&&&&&&&&&&&&&&&
// FUNÇÃO PARA REGISTRO DE USER e SENHA *************************************************************
async function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const elemento = 10;

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

  try {
    const data = {
        info01: email,
        info02: password,
        info03: elemento,
    };

// * CONEXÃO COM O BANCO DE DADOS E RETORNO DO SERVIDOR 
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
        console.log('Resposta do servidor:', text);
        if (text.includes("Dados adicionados ao banco de dados")) {
        // Use SweetAlert para mostrar a mensagem centralizada
        swal("REGISTRO REALIZADO COM SUCESSO", {
            icon: "success",
        }).then(() => {
            // Redireciona para a página index.html após o usuário clicar em OK
            //window.location.href = "index.html";
        });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Erro ao realizar o cadastro: " + error.message);
    });
  
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os dados. Por favor, verifique as informações digitadas e tente novamente.");
  }
}
//**************************************************************************************

*/