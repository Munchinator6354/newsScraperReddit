
// Here I'm requiring mongoose
var mongoose = require("mongoose");

// Here I'm creating a schema class with the mongoose schema method
var Schema = mongoose.Schema;

// Here I'm creating the postSchema with the schema class
var postSchema = new Schema ({
    // id, a number, must be entered, and must be unique
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // title, a string, must be entered, and must be unique
    title: {
        type: String,
        required: true,
        unique: true   
    },
    // link, a string, must be entered
    link: {
        type: String,
        required: true
    },
    // commentsLink, a string, must be enetered
    commentsLink: {
        type: String,
        required: true
    }
    // date: {
    //     type: Date,
    //     default: Date.now,
    //     required: true
    // },
    // saved: {
    //     type: Boolean,
    //     default: false,
    //     required: true
    // }
});

var Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;