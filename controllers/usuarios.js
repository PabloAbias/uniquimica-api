const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const baseURI = "/usuarios";

export const montarRotas = (app) => {
  app.post(`${baseURI}/register`, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = { name: req.body.name, password: hashedPassword };
      users.push(user);
      res.status(201).send();
    } catch {
      res.status(500).send();
    }
  });

  app.post(`${baseURI}/login`, async (req, res) => {
    const user = users.find((user) => user.name === req.body.name);
    if (user == null) {
      return res.status(400).send("Não foi possível encontrar o usuário");
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
      } else {
        res.send("Não autorizado");
      }
    } catch {
      res.status(500).send();
    }
  });
};
