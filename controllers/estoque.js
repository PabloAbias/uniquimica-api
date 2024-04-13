import { getAll } from "../db/estoque.js";

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
};
