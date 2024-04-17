import moment from "moment";
export const getAll = async (context) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await context.connect();
    const collection = context.db("uniquimica").collection("estoque");

    let hoje = new Date();

    // Convertendo para string no formato 'YYYY-MM-DD'
    let hojeStr = hoje.toISOString().split("T")[0];

    let seisMesesAtras = new Date();
    seisMesesAtras.setMonth(hoje.getMonth() - 6);

    // Convertendo para string no formato 'YYYY-MM-DD'
    let seisMesesAtrasStr = seisMesesAtras.toISOString().split("T")[0];

    const estoque = await collection
      .find({ dtEntrega: { $gte: seisMesesAtrasStr, $lte: hojeStr } })
      .sort({ dtEntrega: -1 })
      .toArray();

    estoque.forEach((e) => {
      e.dtEntregaFormatada = moment(e.dtEntrega).format("MM/YYYY");
    });
    return {
      data: estoque,
      err: null,
    };
  } catch (err) {
    return {
      data: null,
      err: err.message,
    };
  } finally {
    // Ensures that the client will close when you finish/error
    await context.close();
  }
};

export const insert = async (context, items) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await context.connect();
    const collection = context.db("uniquimica").collection("estoque");

    await collection.insertMany(items);

    return {
      data: null,
      err: null,
    };
  } catch (err) {
    return {
      data: null,
      err: err.message,
    };
  } finally {
    // Ensures that the client will close when you finish/error
    await context.close();
  }
};
