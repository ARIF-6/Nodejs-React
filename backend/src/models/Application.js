const mongoose = require('mongoose');
const Counter = require('./Counter');

const applicationSchema = mongoose.Schema(
    {
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        institution: {
            type: String,
            required: true,
        },
        gpa: {
            type: String,
            required: true,
        },
        personalStatement: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
            default: 'PENDING',
        },
        applicationId: {
            type: Number,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to auto-increment applicationId
applicationSchema.pre('save', async function () {
    if (!this.isNew) return;

    try {
        const counter = await Counter.findOneAndUpdate(
            { model: 'Application' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        this.applicationId = counter.count;
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model('Application', applicationSchema);
