export const ultimos = async (res, db) => {
  const sql = "SELECT * FROM vw_resulmoultimos;";

  try {
    db.query(sql, (err, result) => {
      if (err) throw err;

      res.status(200);
      res.send(result);
      return;
    });
  } catch (error) {
    res.status(500);
    res.send(error.mensage);
  }
};

export const detalhes = async (res, db, body) => {
  if(!body.produto_id){
    
    res.status(500);
    res.send(`O produto_id está inválido!`);
    return;
  }

  const sql = `SELECT produto_id, moeda, avg(precounit) as precounit, dtentrega FROM vw_resumo where produto_id = ${body.produto_id} group by dtentrega, moeda ORDER BY dtentrega desc`;

  try {
    db.query(sql, (err, result) => {
      if (err) throw err;

      res.status(200);
      res.send(result);
      return;
    });
  } catch (error) {
    res.status(500);
    res.send(error.mensage);
  }
};