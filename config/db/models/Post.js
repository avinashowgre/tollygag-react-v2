const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  sub_type: String,
  type: String,
  url: { required: [true, "Must provide image url"], trim: true, type: String },
});

const PostSchema = new mongoose.Schema(
  {
    created_at: Number,
    content: ContentSchema,
    title: { required: [true, "Must provide title"], trim: true, type: String },
    user_id: { trim: true, type: String },
  },
  { collection: "posts" }
);

module.exports = mongoose.model("Post", PostSchema);
