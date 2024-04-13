// import express from "express";
// import fs from "fs";
// import { format } from 'date-fns';

// const app = express();
// const PORT = 4000;

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hai Team" });
// });

// app.get('/get-data', (req, res) => {
//     res.status(200).json({ message: "data", data: { name: "Sridhar" } });
// });

// app.get('/write-read', (req, res) => {
//     let today = format(new Date(), 'dd-MM-yyyy-HH-mm-ss'); // Correcting the date format
//     console.log("today", today);
//     const filePath = `TimeStamp/${today}.txt`; // Correcting the file path
//     fs.writeFileSync(filePath, `${today}`, 'utf8');
//     let data = fs.readFileSync(filePath, 'utf8');
//     res.status(200).send(data);
// });

// app.listen(PORT, () => {
//     console.log(`App is running in the port = ${PORT}`);
// });

import express from "express";
import fs from "fs";
import { format } from 'date-fns';
import path from 'path'; // Import the path module

const app = express();
const PORT = 4000;

// Endpoint to create a text file with current timestamp
app.get('/create-file', (req, res) => {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
    const fileName = `${timestamp}.txt`;
    const folderPath = 'D:/MyDay1Nodejs/TimeStamp'; // Update with your folder path
    const filePath = path.join(folderPath, fileName); // Use path.join to construct file path

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively
    }

    fs.writeFile(filePath, timestamp, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating file', error: err });
        }
        res.status(200).json({ message: 'File created successfully', fileName: fileName });
    });
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
