const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  createTicket, getMyTickets, updateStatus, addReply
} = require('../controllers/ticketController');

router.post('/', protect, createTicket);
router.get('/my', protect, getMyTickets);
router.put('/:id/status', protect, authorizeRoles('agent', 'admin'), updateStatus);
router.post('/:id/reply', protect, addReply);

module.exports = router;
