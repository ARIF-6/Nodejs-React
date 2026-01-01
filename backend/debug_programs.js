const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./src/models/Program');

dotenv.config();

const debugPrograms = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db');
        console.log('Connected to MongoDB');

        const count = await Program.countDocuments();
        console.log(`Total Programs found: ${count}`);

        if (count > 0) {
            const programs = await Program.find().limit(5);
            console.log('First 5 programs:', JSON.stringify(programs, null, 2));
        } else {
            console.log('No programs found in the "programs" collection.');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugPrograms();
