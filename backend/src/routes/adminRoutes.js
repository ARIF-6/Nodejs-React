const express = require('express');
const router = express.Router();
const { getDashboardCounts, getUsers, deleteUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Application = require('../models/Application');
const Program = require('../models/Program');


// Combined endpoint for dashboard counts
router.get('/dashboard/counts', protect, authorize('ADMIN'), getDashboardCounts);

// Frontend expects separate endpoints:
// /api/admin/users/count
// /api/admin/applications/count
// /api/admin/programs/count
// I'll implement them here directly or via controller for simplicity

router.get('/users/count', protect, authorize('ADMIN'), async (req, res) => {
    const count = await User.countDocuments({ role: 'USER' });
    res.json(count);
});


router.get('/applications/count', protect, authorize('ADMIN'), async (req, res) => {
    const count = await Application.countDocuments();
    res.json(count);
});

router.get('/programs/count', protect, authorize('ADMIN'), async (req, res) => {
    const count = await Program.countDocuments();
    res.json(count);
});

router.get('/users', protect, authorize('ADMIN'), getUsers);
router.delete('/users/:id', protect, authorize('ADMIN'), deleteUser);

module.exports = router;
