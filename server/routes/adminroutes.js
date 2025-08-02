const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createCategory, getUsers } = require('../controllers/adminController');

router.post('/category', protect, authorizeRoles('admin'), createCategory);
router.get('/users', protect, authorizeRoles('admin'), getUsers);

module.exports = router;
