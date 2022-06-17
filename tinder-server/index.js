import express from "express";
import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://Nero2005:mernstack@cluster0.2uruf.mongodb.net/?retryWrites=true&w=majority";

const PORT = 8000;
const app = express();

app.post("/signup", (req, res) => {});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("tinder-clone");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
