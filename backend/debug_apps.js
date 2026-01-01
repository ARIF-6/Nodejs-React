const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Application = require('./src/models/Application');
const User = require('./src/models/User');
const Program = require('./src/models/Program');

dotenv.config();

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db');
        console.log('Connected to MongoDB');

        const apps = await Application.find().limit(5);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        const users = await User.find().limit(5);
        console.log('--- Users ---');
        console.log(JSON.stringify(users, null, 2));

        const programs = await Program.find().limit(5);
        console.log(`--- Programs (${programs.length}) ---`);
        programs.forEach(p => {
            console.log(`Title: ${p.title} | ProgramID: ${p.programId} (Type: ${typeof p.programId}) | _id: ${p._id}`);
        });

        console.log('--- Raw Applications ---');
        console.log('--- Raw Applications ---');
        console.log(JSON.stringify(apps, null, 2));

        if (apps.length > 0) {
            // ...
        } else {
            console.log('Trying to manually create an application...');
            // Pick a user and a program
            const user = await User.findOne();
            const program = await Program.findOne();
            if (user && program) {
                const newApp = await Application.create({
                    program: program._id,
                    applicant: user._id,
                    fullName: 'Manual Test',
                    email: 'manual@test.com',
                    dateOfBirth: '1999-01-01',
                    institution: 'Manual Uni',
                    gpa: '4.0',
                    personalStatement: 'Manual test.'
                });
                console.log('Manually created app:', newApp._id);

                // Read back
                const check = await Application.findById(newApp._id);
                console.log('Read back app:', check ? 'FOUND' : 'NOT FOUND');
            } else {
                console.log('Need user and program to test.');
            }
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugDB();
