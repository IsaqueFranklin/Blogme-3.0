const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    username: {type:String, unique:true},
    email: {type:String, unique:true},
    password: String,
    photo: [String],
    following: [mongoose.Schema.Types.ObjectId],
    followers: [mongoose.Schema.Types.ObjectId],
    emailList: [String],
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;