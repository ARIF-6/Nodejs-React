const axios = require('axios');

const BASE_URL = 'http://localhost:8080';
const API_URL = 'http://localhost:8080/api';

const run = async () => {
    try {
        // 1. Register/Login User
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';
        let token;

        console.log(`1. Registering/Logging in user: ${email}`);
        try {
            await axios.post(`${BASE_URL}/auth/register`, {
                name: 'Test User',
                email,
                password
            });
        } catch (e) {
            // If already exists, login
        }

        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        });
        token = loginRes.data.token;
        console.log('   Token received.');

        // 2. Fetch Programs
        console.log('2. Fetching programs...');
        const programsRes = await axios.get(`${API_URL}/admin/programs`);
        const programs = programsRes.data;
        console.log(`   Fetched ${programs.length} programs.`);
        if (programs.length > 0) {
            console.log(`   Sample Program: ${JSON.stringify(programs[0])}`);
            programs.forEach(p => console.log(`   - ID: ${p.id} (_id: ${p._id})`));
        }
        return; // EXIT HERE WITHOUT APPLYING
        if (programs.length === 0) {
            console.error('   No programs found! Cannot apply.');
            return;
        }
        const targetProgram = programs[0];
        console.log(`   Target Program: ID=${targetProgram.id}, Title=${targetProgram.title}`);

        // 3. Apply
        console.log(`3. Applying to program ID: ${targetProgram.id}`);
        try {
            const applicationData = {
                fullName: 'Test User',
                email: email,
                dateOfBirth: '2000-01-01',
                institution: 'Test Uni',
                gpa: '3.5',
                personalStatement: 'I want this.'
            };

            const applyRes = await axios.post(
                `${API_URL}/applications/apply/${targetProgram.id}`,
                applicationData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('   Application submitted. ID:', applyRes.data._id);
        } catch (err) {
            console.error('   Apply Failed:', err.response?.data || err.message);
            return;
        }

        // 4. Fetch My Applications
        console.log('4. Fetching My Applications...');
        const myAppsRes = await axios.get(
            `${API_URL}/applications/my`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(`   Found ${myAppsRes.data.length} applications.`);
        if (myAppsRes.data.length > 0) {
            console.log('   Success! Application found.');
            console.log('   App Data:', JSON.stringify(myAppsRes.data[0], null, 2));
        } else {
            console.error('   FAILURE: Application NOT found in list.');
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) console.error('Response:', error.response.data);
    }
};

run();
