require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { fakeDB } = require("./server/fakeDB");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./server/tokens");
const { isAuth } = require("./server/isAuth");

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

    user.refreshToken = refreshToken;

    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, req, accessToken);
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});

app.post("/signout", (_req, res) => {
  res.clearCookie("refreshToken");
  res.send({ message: "Logged out" });
});

app.post("/protected", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: " This is protected data",
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

app.post("/refresh_token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.send({
      accessToken: "",
    });
  }
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }

  const user = fakeDB.find((user) => user.id === payload.userId);
});
