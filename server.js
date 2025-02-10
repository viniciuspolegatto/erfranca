const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// Configuração de sessão
app.use(
  session({
    secret: "segredo_super_secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 } // Expira em 1 hora
  })
);

// Função para conectar ao banco de dados sob demanda
const connectDB = () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });
};

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const db = connectDB(); // Conecta ao banco
  const sql = "SELECT * FROM USER_SENHAS_EMAIL WHERE email = ? AND password = ?";
  
  db.query(sql, [username, password], (err, results) => {
    db.end(); // Fecha a conexão

    if (err) {
      console.error("Erro no banco de dados:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    if (results.length > 0) {
      req.session.user = username; // Armazena o usuário na sessão
      res.json({ success: true, message: "Login bem-sucedido" });
    } else {
      res.status(401).json({ success: false, message: "Usuário ou senha incorretos" });
    }
  });
});

// Rota para verificar autenticação
app.get("/auth", (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Rota de logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logout realizado" });
  });
});

// Servir arquivos estáticos (Frontend)
app.use(express.static("public"));

// Iniciar servidor no Glitch
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
