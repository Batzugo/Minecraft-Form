const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);

            const dataToSave = `
Aternos Username: ${formData.aternosname}
Minecraft Username: ${formData.minecraftusername}
Building Skill: ${formData.buildinginfo}
PvP Rating: ${formData.pvpinfo}
Likes Survival: ${formData.survivalinfo}
Playing Since: ${formData.playinginfo}
-------------------------
`;

            fs.appendFile('formdata.txt', dataToSave, (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Server error. Please try again.');
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Form submitted successfully!');
            });
        });

    } else if (req.method === 'GET' && req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error loading page.');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});