const express = require('express');
const router = express.Router();
const { applyForProgram, getMyApplications, getAllApplications, updateApplicationStatus, deleteApplication } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/apply/:programId', protect, applyForProgram);
router.get('/my', protect, getMyApplications);
router.get('/', protect, authorize('ADMIN'), getAllApplications);
router.put('/:id', protect, authorize('ADMIN'), updateApplicationStatus);
router.delete('/:id', protect, authorize('ADMIN'), deleteApplication);

module.exports = router;
