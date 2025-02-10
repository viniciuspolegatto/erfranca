const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public")); // Servir arquivos HTML e JS

const dbConfig = {
    host: "bgnymdsubmecgymv1d9v-mysql.services.clever-cloud.com",
    user: "uoz9zbjbmoc2wluj",
    password: "noXqoLIyeVMPH1aPKFSp",
    database: "bgnymdsubmecgymv1d9v",
    port: 3306
};

// Rota de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const connection = mysql.createConnection(dbConfig);

    connection.connect();
    connection.query(
        "SELECT * FROM USER_SENHAS_EMAIL WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) {
                res.status(500).json({ success: false, message: "Erro no servidor" });
            } else if (results.length > 0) {
                res.cookie("auth", email, { 
                    maxAge: 3600000, 
                    httpOnly: true, 
                    sameSite: "None", 
                    secure: true 
                });
                res.json({ success: true, message: "Login bem-sucedido" });
            } else {
                res.json({ success: false, message: "Credenciais inválidas" });
            }
        }
    );

    connection.end();
});


// Rota de verificação de autenticação
app.get("/check-auth", (req, res) => {
    if (req.cookies.auth) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Rota de logout
app.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.json({ success: true });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
