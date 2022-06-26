import "dotenv/config";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";
import { exec } from "child_process";

const uri =
  "mongodb+srv://Nero2005:mernstack@cluster0.2uruf.mongodb.net/?retryWrites=true&w=majority";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
exec("mkdir uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    exec("mkdir uploads");
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const connect = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  try {
    await client.connect();
    return client;
    const database = client.db("tinder-clone");
    // console.log(database);
    // return database;
  } catch (err) {
    console.log(err);
  }
};

const disconnect = async (client) => {
  await client.close();
};

app.post("/login", async (req, res) => {
  const client = await connect();
  const db = client.db("tinder-clone");
  const user = db.collection("users");
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({ email });
    // const correctPassword
    if (
      foundUser &&
      (await bcrypt.compare(password, foundUser.hashed_password))
    ) {
      const token = jwt.sign(foundUser, email, { expiresIn: "1d" });
      return res.status(201).json({ token, userId: foundUser.user_id });
    }
    return res.status(400).json("Invalid email or password");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } finally {
    await disconnect(client);
  }
});

app.post("/signup", async (req, res) => {
  const client = await connect();
  const db = client.db("tinder-clone");
  // console.log(db);
  const user = db.collection("users");
  // console.log(user);
  const { email, password } = req.body;
  console.log(req.body);
  // res.status(200).json("hi");
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json("User already exists. Please login");
    }
    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };
    const insertedUser = await user.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, { expiresIn: "1d" });

    return res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  } finally {
    await disconnect(client);
  }
});

app.get("/user", async (req, res) => {
  const userId = req.params.userId;

  try {
    const client = await connect();
    const db = client.db("tinder-clone");
    const user = db.collection("users");

    const foundUser = await user.findOne({ user_id: userId });
    res.json(foundUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  } finally {
    await disconnect(client);
  }
});

app.get("/users", async (req, res) => {
  const client = await connect();
  const db = client.db("tinder-clone");
  const user = db.collection("users");

  try {
    const returnedUsers = await user.find().toArray();
    res.json(returnedUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  } finally {
    await disconnect(client);
  }
});

app.put("/user", upload.single("imageData"), async (req, res) => {
  const client = await connect();
  const db = client.db("tinder-clone");
  const user = db.collection("users");
  const formData = JSON.parse(req.body.formData);
  const filePath = req.file.path;
  console.log(formData);

  try {
    const image = await cloudinary.v2.uploader.upload(filePath, {
      use_filename: true,
      unique_filename: false,
    });
    fs.unlinkSync(filePath);
    const foundUser = await user.updateOne(
      { user_id: formData.user_id },
      {
        $set: {
          ...formData,
          url: image.url,
        },
      }
    );
    return res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  } finally {
    await disconnect(client);
  }
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server running on port ${PORT}`);
});
