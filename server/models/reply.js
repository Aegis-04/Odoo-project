const mongoose = require('mongoose');
const replySchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String
}, { timestamps: true });
module.exports = mongoose.model('Reply', replySchema);
