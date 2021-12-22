// To access .env file variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const mainRoutes = require("../config/routes/main");
const posts = require("../config/routes/posts");

const connectDB = require("../config/db/connect");

const notFound = require("../config/middleware/not-found");

const errorHandlerMiddleware = require("../config/middleware/error-handler");

// Enable cors security headers
app.use(cors());

// middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

app.use("/api/v1/auth", mainRoutes);
app.use("/api/v1/posts", posts);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_CONNECTION_STRING);
    // This displays message that the server running and listening to specified port
    app.listen(process.env.PORT || port, () =>
      console.log(`Listening on port ${process.env.PORT || port}!`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
