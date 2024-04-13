export const getAll = async (context) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await context.connect();
    const collection = context.db("uniquimica").collection("estoque");

    const estoque = await collection.find({}).toArray();
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
