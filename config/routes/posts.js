const express = require("express");
const gcsMiddlewares = require("../middleware/google-cloud-storage");
const gcfsMiddlewares = require("../middleware/google-cloud-firestore");
const Multer = require("multer");
const router = express.Router();

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.get("/:postId", function (req, res) {
  res.send("Birds home page");
});

router.post(
  "/create",
  [
    multer.single("file"),
    gcsMiddlewares.sendUploadToGCS,
    gcfsMiddlewares.createPostInGCS,
  ],
  function (req, res, next) {
    if (req.postId) {
      return res.send({
        message: "Post created successfully!",
      });
    }

    return res.status(500).send("Unable to create post");
  }
);

router.put("/update", function (req, res) {
  res.send("Birds home page");
});

router.delete("/delete", function (req, res) {
  res.send("Birds home page");
});

module.exports = router;
