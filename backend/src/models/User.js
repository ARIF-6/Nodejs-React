const mongoose = require('mongoose');
const Counter = require('./Counter');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        userId: {
            type: Number,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to auto-increment userId
userSchema.pre('save', async function () {
    if (!this.isNew) return;

    try {
        const counter = await Counter.findOneAndUpdate(
            { model: 'User' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        this.userId = counter.count;
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model('User', userSchema);
