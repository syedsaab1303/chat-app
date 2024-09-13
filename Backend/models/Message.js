const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    chatRoom: { type: String, required: true }, // Can be a chat room ID or user-to-user chat identifier
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
