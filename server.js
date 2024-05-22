const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const app = express();
const PORT = 3000;
const FOLDER_PATH = path.join(__dirname, 'files');

// Ensure the directory exists
if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
}

// Endpoint to create a file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const filename = moment().format('YYYY-MM-DD_HH-mm-ss') + '.txt';
    const filepath = path.join(FOLDER_PATH, filename);

    fs.writeFile(filepath, timestamp, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send(`File created: ${filename}`);
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/files', (req, res) => {
    fs.readdir(FOLDER_PATH, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
