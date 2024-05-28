const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));

// Endpoint to get data
app.get('/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to save data
app.post('/data', (req, res) => {
    const newData = req.body;
    if (!Array.isArray(newData) || newData.some(item => typeof item.name !== 'string' || typeof item.value !== 'string')) {
        res.status(400).send('Invalid data format');
        return;
    }

    fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error writing data file');
            return;
        }
        res.send('Data saved successfully');
    });
});

app.listen(port,"0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
});
