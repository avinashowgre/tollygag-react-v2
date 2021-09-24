const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { fakeDB } = require("./server/fakeDB");
const { createAccessToken, createRefreshToken } = require("./server/tokens");

const app = express();
const port = process.env.PORT || 5000;

// use express middleware for easier cookie handling
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
  })
);

// Needed to be able to read body data
app.use(express.json()); // to support JSON encoded bodies
app.use(express.urlencoded({ extended: true })); // support url encoded bodies

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = fakeDB.find((user) => user.email === email);
    if (user) {
      throw new Error("User Already Exists");
    }
    const hashedPassword = await hash(password, 10);
    fakeDB.push({ id: fakeDB.length, email, password: hashedPassword });
    res.send({ message: "User created" });
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = fakeDB.find((user) => user.email === email);
    if (!user) {
      throw new Error("User does not exist");
    }
    // compare crypted password and see if it checks out
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Incorrect password");
    }
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    res.send({ message: "User created" });
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});
