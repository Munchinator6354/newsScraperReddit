var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var headlineSchema = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: {index:{unique:true}}
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    commentsLink: {
        type: String,
        required: true
    }
});