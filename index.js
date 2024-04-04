import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { db, useUltimos, useDetalhes, manterOn } from "./db/index.js";

// Criando uma nova instância do Express
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost",
    "http://3.143.24.119",
    "http://3.143.24.119/",
    "3.143.24.119"
  ],
};

// Usando o body-parser como middleware para lidar com JSON
app.use(bodyParser.json());
app.use(cors(corsOptions));

await db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

var mantendoOn = null;
clearInterval(mantendoOn);
mantendoOn = setInterval(() => {
  manterOn();
}, 1000 * 60 * 2);

app.post("/", (req, res) => {
  if (!req.body.token) {
    res.status(401);
    res.send("Não autorizado!");
    return;
  }

  useUltimos(res);
});

app.post("/getById", (req, res) => {
  if (!req.body.token) {
    res.status(401);
    res.send("Não autorizado!");
    return;
  }

  useDetalhes(res, req.body);
});

// Definindo a porta do servidor
const port = 3000;

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
