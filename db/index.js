import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from "dotenv";
const process = dotenv.config().parsed;

process.db_user = "admin"
process.db_password = "nLMUXJwdg32mAIoh"

const uri = `mongodb+srv://${process.db_user}:${process.db_password}@clustersaopaulo.krzje8i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Conectado ao MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

run();
export { client };
