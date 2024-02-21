// importing mongoose

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

// create user schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);



userSchema.post("save", async function (doc) {

  try {

      // transporter
      let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
          }
      })

      // mail send

      let info = await transporter.sendMail({
          from: `ramkumar`,
          to: doc.email,
          subject: "Your account created",
          html: `<h2>This is simple notification for account creation </h2>`
      })

      console.log("info ", info);

  } catch (error) {
      console.error(error);
  }

})

// export user schema
module.exports = mongoose.model("User", userSchema);
