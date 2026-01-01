const axios = require('axios');
const fs = require('fs');

const run = async () => {
    try {
        const res = await axios.get('http://localhost:8080/api/admin/programs');
        fs.writeFileSync('program_api_dump.json', JSON.stringify(res.data, null, 2));
        console.log('Dumped');
    } catch (e) {
        console.error(e);
    }
};
run();
