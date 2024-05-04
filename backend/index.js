const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.User_name}:${process.env.User_Pass}@cluster0.digwdjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const root = async (req, res) => {
  res.send("Thank you for hit our Server!!")
}

async function run() {
  try {

    const database = client.db('Todo-Management')
    const haveToComplete = database.collection("complete")
    const haveToSolve = database.collection("solve")

    app.get('/', async (req, res) => {
      root(req, res)
    })

    app.get('/all_task_to_solve', async (req, res) => {
      const cursor = haveToSolve.find()
      const result = await cursor.toArray();
      res.send(result)

    })

    app.get('/all_task_to_complete', async (req, res) => {
      const cursor = haveToComplete.find()
      const result = await cursor.toArray();
      res.send(result)

    })

    app.post('/addCompleteTask', async (req, res) => {
      let responseMessage;
      const newCompletionChallenge = req.body;
      const result = await haveToSolve.insertOne(newCompletionChallenge)
      if (result.acknowledged) {
        res.status(201);
        responseMessage = "Added Successfully!"
      }
      res.send(responseMessage)
    })

    app.post('/addsolveTask', async (req, res) => {
      let responseMessage;
      const newCompletionChallenge = req.body;
      const result = await haveToComplete.insertOne(newCompletionChallenge)
      if (result.acknowledged) {
        res.status(201);
        responseMessage = "Added Successfully!"
      }
      res.send(responseMessage)
    })

    app.delete('/delete/completion/:id', async (req, res) => {
      const id = req.params.id;
      let responseMessage;
      const query = { _id: new ObjectId(id) };
      const deleted = await haveToComplete.deleteOne(query);
      if (deleted.deletedCount) {
        res.status(200);
        responseMessage = "Deleted Successfully!"
      }
      else {
        res.status(404);
        responseMessage = "Item not found!"
      }
      res.send(responseMessage)
    })

    app.delete('/delete/solve/:id', async (req, res) => {
      const id = req.params.id;
      let responseMessage;
      const query = { _id: new ObjectId(id) };
      const deleted = await haveToSolve.deleteOne(query);
      if (deleted.deletedCount) {
        res.status(200);
        responseMessage = "Deleted Successfully!"
      }
      else {
        res.status(404);
        responseMessage = "Item not found!"
      }
      res.send(responseMessage)
    })

  } finally {


  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
})