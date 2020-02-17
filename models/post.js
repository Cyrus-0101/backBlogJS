const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    creator: {
        type: Object,
        required: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);