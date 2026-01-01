const mongoose = require('mongoose');
const Application = require('./src/models/Application');
const User = require('./src/models/User');
const Program = require('./src/models/Program');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const applications = await Application.find({});
        console.log('Total Applications:', applications.length);
        console.log('Applications:', JSON.stringify(applications, null, 2));

        const users = await User.find({});
        console.log('Total Users:', users.length);
        console.log('Users:', JSON.stringify(users.map(u => ({ id: u._id, email: u.email, role: u.role })), null, 2));

        const programs = await Program.find({});
        console.log('Total Programs:', programs.length);
        console.log('Programs:', JSON.stringify(programs.map(p => ({ id: p._id, programId: p.programId, title: p.title })), null, 2));

        mongoose.disconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDB();
