const mongoose = require("mongoose");

const Chat = mongoose.Schema({
    Messages: [
        {
            message: {
                type: String,
                required: true
            },
            sender: {
                type: String,
             
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    Timestamp: {
        type: Date,
        default: Date.now
    },
    ChatId: {
        type: String,
        required: true
    },
  
});

const ChatModel = mongoose.model("Chat", Chat);
module.exports = ChatModel;