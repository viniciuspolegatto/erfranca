/* Arquivo server.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir */

const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3306;
const nodemailer = require('nodemailer');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ************** ESTRUTURA DE ENVIO DE E-MAILS DIRETO DO BACKEND ***************


app.post('/enviarEmail', async (req, res) => {
    const { emailBody } = req.body;

    console.log('Corpo do e-mail recebido:', emailBody); // Log para depuração
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'credenciamentoerbarretos@gmail.com',
            pass: 'zidazixadvzyyslr', // Substitua por um App Password
        },
    });

    const mailOptions = {
        from: 'credenciamentoerbarretos@gmail.com',
        to: 'tudojuntoesemacento@hotmail.com',
        //cc: 'tudojuntoesemacento@hotmail.com',
        subject: 'ER BARRETOS - SOLICITAÇÃO DE CONSULTORIA',
        text: emailBody,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Erro ao enviar o e-mail.');
    }
});



// ************************** Inicialização do Servidor *************************
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});