import { getAll, insert } from "../db/estoque.js";

const baseURI = "/estoque";

export const montarRotas = (app, context) => {
  app.get(`${baseURI}/getAll`, async (req, res) => {
    const { data, err } = await getAll(context);

    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    res.status(200);
    res.send(data);
  });
  app.post(`${baseURI}`, async (req, res) => {
    if (req.body.token !== "tokenDeAdmin") {
      res.status(401);
      res.send("Você não está autorizado!");
      return;
    }
    if (!req.body.items) {
      res.status(401);
      res.send("Itens não foram enviados!");
      return;
    }

    
    const { err } = await insert(context, req.body.items);

    if (err) {
      res.status(500);
      res.send(err);
      return;
    }
    
    res.status(200);
    res.send("Sucesso ao inserir!");
    return;
  });
};
