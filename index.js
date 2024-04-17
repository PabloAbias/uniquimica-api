import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { client as context } from "./db/index.js";
import { montarRotas as montarRotasEstoque } from "./controllers/estoque.js";

// Criando uma nova instância do Express
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://curious-cannoli-12b779.netlify.app"],
};

// Usando o body-parser como middleware para lidar com JSON
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Definindo a porta do servidor
const port = 3000;

// Rotas
montarRotasEstoque(app, context);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
