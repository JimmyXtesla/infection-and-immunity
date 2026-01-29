const https = require('https');
const token = process.argv[2];

const options = {
    hostname: 'scorer-api.vercel.app',
    path: '/api/dashboard/stats',
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log(data);
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
