const gcfsHelpers = require("../helpers/google-cloud-firestore");

const { db } = gcfsHelpers;

const postsRef = db.collection("posts");

exports.createPostInGCS = async (req, res, next) => {
  if (!req.file || !req.file.gcsUrl) {
    return next();
  }

  const postId = `${Date.now()}-post`;

  const post = {
    category: [],
    content: {
      subType: "",
      type: "image",
      url: req.file.gcsUrl,
    },
    createdAt: Date.now(),
    id: postId,
    socialStats: {
      comments: 0,
      downvotes: 0,
      upvotes: 0,
    },
  };

  await postsRef.doc(`${Date.now()}-post`).set(post);
  req.postId = postId;
  next();
};
