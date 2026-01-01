const User = require('../models/User');
const Application = require('../models/Application');
const Program = require('../models/Program');

// @desc    Get counts for dashboard
// @route   GET /api/admin/dashboard/counts
// @access  Private/Admin
const getDashboardCounts = async (req, res) => {
    // We can do this in parallel
    const [userCount, applicationCount, programCount] = await Promise.all([
        User.countDocuments({ role: 'USER' }),
        Application.countDocuments(),
        Program.countDocuments(),
    ]);

    res.status(200).json({
        users: userCount,
        applications: applicationCount,
        programs: programCount,
    });
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({ role: 'USER' }).select('-password');
    res.status(200).json(users);
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has applications? Maybe prevent delete if so, or cascade.
    // For now, simple delete.
    await user.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getDashboardCounts,
    getUsers,
    deleteUser,
};
