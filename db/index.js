import mysql from "mysql";
import { ultimos, detalhes } from "./resumos.js";

export const db = mysql.createConnection({
  host: "18.225.37.30",
  user: "root",
  password: "uniquimica123password!",
  database: "metabase",
});

export const useUltimos = async (res) => {
  return await ultimos(res, db)
}

export const useDetalhes = async (res, body) => {
  return await detalhes(res, db, body)
}

export const manterOn = async () => {
  const sql = `SELECT produto_id FROM produtos LIMIT 0, 1`;
  db.query(sql, () => {});
}