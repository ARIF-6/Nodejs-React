const API_URL = 'http://localhost:8080/api';

const run = async () => {
    try {
        const email = `testuser${Date.now()}@example.com`;
        console.log("Registering...", email);
        let res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test User', email, password: 'password123' })
        });
        if (!res.ok) throw new Error(await res.text());

        console.log("Logging in...");
        res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: 'password123' })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const token = data.token;
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
        console.log("Got Token");

        console.log("Fetching programs...");
        res = await fetch(`${API_URL}/admin/programs`, { headers });
        // The endpoint might be protected.
        // If 403, we know the issue.
        if (res.status === 403) {
            console.log("Access Forbidden to programs list (403)");
            return;
        }
        if (!res.ok) throw new Error(await res.text());

        const programs = await res.json();
        console.log(`Found ${programs.length} programs`);

        if (programs.length === 0) return;

        const program = programs[0];
        console.log("Applying for program:", program.id || program.programId);

        res = await fetch(`${API_URL}/applications/apply/${program.id || program.programId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                fullName: 'Test Applicant',
                email: 'test@applicant.com',
                dateOfBirth: '2000-01-01',
                institution: 'Test Uni',
                gpa: '3.5',
                personalStatement: 'I want this.'
            })
        });
        if (!res.ok) throw new Error(await res.text());
        console.log("Applied successfully!");

        console.log("Fetching applications...");
        res = await fetch(`${API_URL}/applications/my`, { headers });
        if (!res.ok) throw new Error(await res.text());
        const myApps = await res.json();
        console.log("My Applications:", JSON.stringify(myApps, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
};

run();
