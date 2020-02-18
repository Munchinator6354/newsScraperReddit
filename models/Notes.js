var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    // title: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // link: {
    //     type: String,
    //     required: true
    // },
    // commentsLink: {
    //     type: String,
    //     required: true
    // },
    _postId: {
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    noteText: String
    // saved: {
    //     type: Boolean,
    //     default: false,
    //     required: true
    // }
});

var Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes;