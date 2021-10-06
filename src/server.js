require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { fakeDB } = require("../config/fakeDB");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../config/tokens");
const { isAuth } = require("../config/isAuth");
const { Storage } = require("@google-cloud/storage");

const gcsMiddlewares = require("../config/middleware/google-cloud-storage");

const Multer = require("multer");

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

// Imports the Google Cloud client library
const { Datastore } = require("@google-cloud/datastore");
const { Storage } = require("@google-cloud/storage");

// Creates a client
const datastore = new Datastore();
const gc = new Storage();

const app = express();
const port = process.env.PORT || 5000;

// use express middleware for easier cookie handling
// app.use(cookieParser());

// app.use(
//   cors({
//     credentials: true,
//     origin: "https://localhost:3000",
//   })
// );

// Needed to be able to read body data
app.use(express.json()); // to support JSON encoded bodies
app.use(express.urlencoded({ extended: true })); // support url encoded bodies

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.resolve(__dirname, "../build")));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/api/signup", async (req, res) => {
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

app.post("/api/signin", async (req, res) => {
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

app.post("/api/signout", (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });
  // Logic here for also remove refreshtoken from db
  return res.send({
    message: "Logged out",
  });
});

app.post("/api/protected", async (req, res) => {
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

app.post("/api/refresh_token", (req, res) => {
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

app.get("/upload_google_storage", async (req, res) => {
  filePath = "./src/assets/img1.jpg";
  const gc = new Storage({
    keyFilename: path.join(__dirname, "../config/credentials.json"),
    projectId: "silicon-data-327202",
  });

  await gc.bucket("tgag").upload(filePath, {
    destination: "test-image",
  });

  res.send({
    message: `${filePath} uploaded to tgag`,
  });
});

app.post(
  "/upload",
  [multer.single("file"), gcsMiddlewares.sendUploadToGCS],
  (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      return res.send({
        data: req.file.gcsUrl,
      });
    }

    return res.status(500).send("Unable to upload");
  }
);

app.get("/post", async (req, res) => {
  const query = datastore.createQuery("post");

  const [result] = await datastore.runQuery(query);

  res.send({ data: result });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
