const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./src/models/Program');
const User = require('./src/models/User');
const Application = require('./src/models/Application');
const Counter = require('./src/models/Counter');

dotenv.config();

const resetAllIds = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db');
        console.log('Connected to MongoDB');

        // 1. Clear Counter collection
        await Counter.deleteMany({});
        console.log('Cleared Counter collection.');

        // 2. Reset Program IDs
        const programs = await Program.find({}).sort({ createdAt: 1 });
        console.log(`Resetting IDs for ${programs.length} programs...`);
        let pCount = 0;
        for (const p of programs) {
            pCount++;
            p.programId = pCount;
            await p.save();
        }
        await Counter.create({ model: 'Program', count: pCount });
        console.log(`Program IDs reset. Counter at ${pCount}`);

        // 3. Reset User IDs
        const users = await User.find({}).sort({ createdAt: 1 });
        console.log(`Resetting IDs for ${users.length} users...`);
        let uCount = 0;
        for (const u of users) {
            uCount++;
            u.userId = uCount;
            await u.save();
        }
        await Counter.create({ model: 'User', count: uCount });
        console.log(`User IDs reset. Counter at ${uCount}`);

        // 4. Reset Application IDs
        const applications = await Application.find({}).sort({ createdAt: 1 });
        console.log(`Resetting IDs for ${applications.length} applications...`);
        let aCount = 0;
        for (const a of applications) {
            aCount++;
            a.applicationId = aCount;
            await a.save();
        }
        await Counter.create({ model: 'Application', count: aCount });
        console.log(`Application IDs reset. Counter at ${aCount}`);

        console.log('All IDs reset successfully!');
        process.exit();
    } catch (error) {
        console.error('Error during reset:', error);
        process.exit(1);
    }
};

resetAllIds();
