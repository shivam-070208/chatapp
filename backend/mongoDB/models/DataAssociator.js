const mongoose= require("mongoose");

const DataAssociator = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ChatCollection:[
     {Friend:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
    ChatId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat"
    
    }
    }

    ],

  
    GroupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    }
});
const DataAssociatorModel = mongoose.model("DataAssociator", DataAssociator);
module.exports = DataAssociatorModel;