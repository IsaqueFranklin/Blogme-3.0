const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    content: String,
    photos: [String],
    dia: Date,
    modific: Date,
    likes: [String],
    enviado: {type:Boolean, default:false},
    EnviadoPara: [String],
});

const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;