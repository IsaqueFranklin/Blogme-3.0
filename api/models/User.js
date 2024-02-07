const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    username: {type:String, unique:true},
    email: {type:String, unique:true},
    bio: String,
    instaLink: String,
    externLink: {type:String, default: ''},
    password: String,
    photo: [String],
    following: [mongoose.Schema.Types.ObjectId],
    followers: [mongoose.Schema.Types.ObjectId],
    emailList: [String],
    superUser: {type:Boolean, default:false},
    subs_id: {type:String, default: ''},
    superSuperUser: {type:Number, default:0},
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;