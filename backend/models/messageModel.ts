import mongoose from "mongoose";

// @ts-ignore
const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        content: {
            type: String, trim: true, default: ""
        },
        image: {
            type: String, trim: true,
        },
        file: {
            type: String, trim: true,
        },
        audio: {
            type: String, trim: true
        },
        video: {
            type: String, trim: true
        },
        gif: {
            type: String, trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId, ref: "Chat"
        },
        readBy: [{
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }],
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
