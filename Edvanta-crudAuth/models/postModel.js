const mongoose = require("mongoose");

// create a post model
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export post model
module.exports = mongoose.model("Post", postSchema);
