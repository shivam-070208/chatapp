const mongoose = require('mongoose');


const User = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    PrivateConnection: {
        type: Array,
        default:[]
        
    },
    Groups:{
        type:Array,
        default:[]
    },
    connectedid: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: "offline"
    },
    RequestSend:{
        type:Array,
        default:[]
    },
    RequestReceived:{
        type:Array,
        default:[]
    },
    profilephoto:{
        type: String,
        default: "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
    },
    lastactive: {
        type: Date
    },
    DataStorer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DataAssociator"
    }
});



const UserModel = mongoose.model('user', User);
module.exports = UserModel;