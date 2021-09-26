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
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);

    user.refreshtoken = refreshtoken;

    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});

app.post("/signout", (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });
  // Logic here for also remove refreshtoken from db
  return res.send({
    message: "Logged out",
  });
});

app.post("/protected", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: "This is protected data.",
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

app.post("/refresh_token", (req, res) => {
  const token = req.cookies.refreshtoken;
  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: "" });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
  // token is valid, check if user exist
  const user = fakeDB.find((user) => user.id === payload.userId);
  if (!user) return res.send({ accesstoken: "" });
  // user exist, check if refreshtoken exist on user
  if (user.refreshtoken !== token) return res.send({ accesstoken: "" });
  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
});
