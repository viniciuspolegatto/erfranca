require("dotenv").config(); // Carrega variáveis do arquivo .env
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Configuração da sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hora
      httpOnly: true,
      secure: true, // Requer HTTPS
      sameSite: "strict",
    },
  })
);

// Função para conectar ao banco de dados apenas quando necessário
const connectDB = () =>
  mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });

// Rota de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = connectDB();

  db.query(
    "SELECT * FROM USER_SENHAS_EMAIL WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      db.end(); // Encerra a conexão
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (result.length === 0) return res.status(401).json({ error: "Credenciais inválidas" });

      req.session.user = email; // Armazena sessão
      res.json({ success: true });
    }
  );
});

// Middleware para verificar se o usuário está autenticado
const authMiddleware = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ error: "Não autenticado" });
  next();
};

// Rota para verificar sessão ativa
app.get("/auth", authMiddleware, (req, res) => {
  res.json({ authenticated: true, user: req.session.user });
});

// Rota de logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

app.listen(3306, () => console.log("Servidor rodando na porta 3000"));
