var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
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
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;