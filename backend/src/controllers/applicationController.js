const Application = require('../models/Application');
const Program = require('../models/Program');

// @desc    Apply for a program
// @route   POST /api/applications/apply/:programId
// @access  Private
const applyForProgram = async (req, res) => {
    try {
        const { fullName, email, dateOfBirth, institution, gpa, personalStatement } = req.body;
        const programNumericId = req.params.programId; // This is '1', '2', etc.

        if (!fullName || !email || !dateOfBirth || !institution || !gpa || !personalStatement) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Find the actual Program ObjectId using the numeric ID
        const program = await Program.findOne({ programId: programNumericId });
        console.log("Found Program:", program);

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        const application = await Application.create({
            program: program._id,
            applicant: req.user._id, // Explicitly use _id
            fullName,
            email,
            dateOfBirth,
            institution,
            gpa,
            personalStatement,
        });

        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get My Applications
// @route   GET /api/applications/my
// @access  Private
const getMyApplications = async (req, res) => {
    console.log("Fetching applications for user:", req.user._id);
    try {
        const applications = await Application.find({ applicant: req.user._id }).populate('program');
        console.log("Found applications count:", applications.length);
        res.status(200).json(applications);
    } catch (err) {
        console.error("Error fetching applications:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get All Applications (Admin)
// @route   GET /api/applications
// @access  Private/Admin
const getAllApplications = async (req, res) => {
    const applications = await Application.find()
        .populate('program')
        .populate('applicant', 'name email');
    res.status(200).json(applications);
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        console.log(`[Backend] Updating application ID: ${req.params.id} to status: ${status}`);

        const application = await Application.findById(req.params.id);

        if (!application) {
            console.error(`[Backend] Application not found with ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        await application.save();
        console.log("[Backend] Status saved, now fetching populated record...");

        // Robust way to get the populated document back for the frontend
        const updatedApplication = await Application.findById(req.params.id).populate('program');

        console.log("[Backend] Status update and population successful");
        res.status(200).json(updatedApplication);
    } catch (err) {
        console.error("[Backend] Error updating application status:", err);
        res.status(500).json({ message: "Server error during status update", error: err.message });
    }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = async (req, res) => {
    const application = await Application.findById(req.params.id);

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    await application.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    applyForProgram,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus,
    deleteApplication,
};
