//External Imports
const mongoose = require("mongoose");

//Create database structure
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please write blog title"],
      minLength: [8, "Title Should more then 8 characters"],
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please write blog title"],
    },
    coverImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        profilePicture: {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
        name: {
          type: String,
        },
        message: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
