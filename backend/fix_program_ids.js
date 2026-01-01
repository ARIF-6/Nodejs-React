const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./src/models/Program');
const Counter = require('./src/models/Counter'); // Assuming Counter model exists

dotenv.config();

const fixProgramIds = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db');
        console.log('Connected to MongoDB');

        const programs = await Program.find({ programId: { $exists: false } });
        console.log(`Found ${programs.length} programs without programId.`);

        if (programs.length > 0) {
            // Find max existing programId
            const lastProgram = await Program.findOne({ programId: { $exists: true } }).sort({ programId: -1 });
            let maxId = lastProgram ? lastProgram.programId : 0;

            console.log(`Current Max programId in DB: ${maxId}`);

            let counter = await Counter.findOne({ model: 'Program' });
            if (!counter) {
                counter = new Counter({ model: 'Program', count: maxId });
            } else if (counter.count < maxId) {
                counter.count = maxId;
            }

            let currentId = counter.count;
            for (const program of programs) {
                try {
                    currentId++;
                    program.programId = currentId;
                    await program.save();
                    console.log(`Assigned ID ${currentId} to program: ${program.title}`);
                } catch (saveErr) {
                    console.error(`Failed to save program ${program._id}:`, saveErr.message);
                }
            }

            counter.count = currentId;
            await counter.save();
            console.log('Sync complete.');
        } else {
            console.log('No programs need fixing.');

            // Still sync counter just in case
            const lastProgram = await Program.findOne({ programId: { $exists: true } }).sort({ programId: -1 });
            const maxId = lastProgram ? lastProgram.programId : 0;
            await Counter.findOneAndUpdate(
                { model: 'Program' },
                { $set: { count: maxId } },
                { upsert: true }
            );
            console.log(`Counter synced to maxId: ${maxId}`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixProgramIds();
