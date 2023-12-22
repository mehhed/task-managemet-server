const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
require("dotenv").config();
// set up running port
const port = process.env.PORT || 3000;
// cors for of auto block when call data by other client site
const cors = require("cors");
// jWt
const jwt = require("jsonwebtoken");
// middle ware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-managemet.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// require mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// ===========================================
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// mongodb uri
const uri =
  "mongodb+srv://AutoRevolveHub:ILHIs6Al8mrX3rsH@curd-operation-database.movqgwc.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//  main function for connect with mongodb
async function run() {
  try {
    const taskCollection = client
      .db("taskManagementDB")
      .collection("createTasks");

    app.post("/createTask", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });
    app.get("/createTast/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/", async (req, res) => {
      res.send("hello world");
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
// ========================================
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
