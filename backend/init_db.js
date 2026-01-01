const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Program = require('./src/models/Program');
const Application = require('./src/models/Application');
const Counter = require('./src/models/Counter');

dotenv.config();

const initDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}/${conn.connection.name}`);

        // 1. Initialize Counters if they don't exist
        const models = ['User', 'Program', 'Application'];
        for (const model of models) {
            const exists = await Counter.findOne({ model });
            if (!exists) {
                await Counter.create({ model, count: 0 });
                console.log(`Initialized counter for ${model}`);
            } else {
                console.log(`Counter for ${model} already exists`);
            }
        }

        // 2. Ensure Collections exist by inserting/deleting or just checking (Mongoose handles this)
        // However, we can create a default Admin if no users exist
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'System Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'ADMIN'
            });
            console.log('Created default admin user: admin@example.com / admin123');
        } else {
            console.log('Users already exist, skipping default admin creation');
        }

        console.log('Database initialization complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    }
};

initDB();
