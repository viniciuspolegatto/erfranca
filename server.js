require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3306; // Usar a porta do ambiente ou 3000 como fallback

// Middleware para parsear cookies e JSON
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para parsear dados de formulários
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Configuração do banco de dados
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: 3306
};

// Função para conectar ao banco de dados
function connectToDB() {
  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL');
  });
  return connection;
}

// Middleware para verificar autenticação
function checkAuth(req, res, next) {
  if (req.cookies.auth === 'true') {
    console.log('Usuário autenticado');
    next();
  } else {
    console.log('Usuário não autenticado, redirecionando para login');
    res.redirect('/');
  }
}

// Rota para a página inicial (login)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rota para autenticação
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const connection = connectToDB();

  const query = 'SELECT * FROM USER_SENHAS_EMAIL WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).send('Erro no servidor');
    }

    if (results.length > 0) {
      console.log('Login bem-sucedido para:', email);
      res.cookie('auth', 'true', { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 3600000 }); // Cookie válido por 1 hora
      res.status(200).json({ success: true, redirect: '/home' }); // Resposta de sucesso com redirecionamento
    } else {
      console.log('Credenciais inválidas para:', email);
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    connection.end(); // Fecha a conexão com o banco de dados
  });
});

// Rota para logout
app.get('/logout', (req, res) => {
  res.clearCookie('auth');
  console.log('Usuário deslogado');
  res.redirect('/');
});

// Rota para a página home (restrita)
app.get('/home', checkAuth, (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

// Rota para a página restrita1 (restrita)
app.get('/restrita1', checkAuth, (req, res) => {
  res.sendFile(__dirname + '/public/restrita1.html');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});