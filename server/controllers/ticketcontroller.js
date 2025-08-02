const Ticket = require('../models/ticket');
const Reply = require('../models/reply');
const { sendMail } = require('../utils/emailservice');

exports.createTicket = async (req, res) => {
  const ticket = await Ticket.create({ ...req.body, createdBy: req.user._id });
  await sendMail(req.user.email, "Ticket Created", `Your ticket '${ticket.subject}' is now Open`);
  res.status(201).json(ticket);
};

exports.getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user._id }).populate('category');
  res.json(tickets);
};

exports.updateStatus = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  ticket.status = req.body.status;
  await ticket.save();
  await sendMail(ticket.createdBy.email, "Ticket Status Updated", `Your ticket is now ${ticket.status}`);
  res.json(ticket);
};

exports.addReply = async (req, res) => {
  const reply = await Reply.create({ ticketId: req.params.id, userId: req.user._id, message: req.body.message });
  const ticket = await Ticket.findById(req.params.id);
  ticket.replies.push(reply._id);
  await ticket.save();
  res.status(201).json(reply);
};
