const express = require('express');
const router = express.Router();
const {
    getPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
} = require('../controllers/programController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getPrograms);
router.post('/', protect, authorize('ADMIN'), createProgram);
router.put('/:id', protect, authorize('ADMIN'), updateProgram);
router.delete('/:id', protect, authorize('ADMIN'), deleteProgram);

module.exports = router;
