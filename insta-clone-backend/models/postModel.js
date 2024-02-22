
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : "",
    },

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like",
    }],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]

},{timestamps : true})


module.exports = mongoose.model("Post",postSchema);