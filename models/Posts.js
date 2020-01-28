var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true   
    },
    link: {
        type: String,
        required: true
    },
    commentsLink: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    saved: {
        type: Boolean,
        default: false,
        required: true
    }
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;