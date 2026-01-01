const mongoose = require('mongoose');
const Counter = require('./Counter');

const programSchema = mongoose.Schema(
    {
        programId: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        orientationDate: {
            type: String,
        },
        orientationTime: {
            type: String,
        },
        orientationLocation: {
            type: String,
        },
        orientationLink: {
            type: String,
        },
        orientationAgenda: [
            {
                time: String,
                event: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to auto-increment programId
programSchema.pre('save', async function () {
    if (!this.isNew) return;

    try {
        const counter = await Counter.findOneAndUpdate(
            { model: 'Program' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        this.programId = counter.count;
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model('Program', programSchema);
