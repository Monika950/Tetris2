const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors()); 
app.use(express.json());

let fileDescriptor = null; 

app.post('/file/open', (req, res) => {
  const date = new Date();
  const fileName = `${date.getTime().toString()}.txt`; 
  
  try {
    fileDescriptor = fs.openSync(fileName, 'w'); 
    console.log(`File ${fileName} opened successfully with file descriptor: ${fileDescriptor}`);
    res.status(200).json({ message: 'File opened successfully', fileName });
  } catch (err) {
    console.error('Error opening the file:', err);
    res.status(500).json({ message: 'Failed to open the file', error: err.message });
  }
  })

app.post('/file/write', (req, res) => {
    const { content } = req.body;
    
    if (!fileDescriptor) {
      return res.status(400).json({ message: 'File not opened yet. Please open the file first.' });
    }
  
    fs.write(fileDescriptor, content, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to write to the file', error: err });
      }
      res.status(200).json({ message: 'Content written to the file successfully' });
    });
  });

  app.post('/file/close', (req, res) => {
    try {
      if (fileDescriptor) {
        fs.closeSync(fileDescriptor); 
        console.log('File closed successfully.');
        res.status(200).json({ message: 'File closed successfully' });
      } else {
        res.status(400).json({ message: 'No file is currently open' });
      }
    } catch (err) {
      console.error('Error closing the file:', err);
      res.status(500).json({ message: 'Failed to close the file', error: err.message });
    }
  });

app.listen(3000, () => {
    console.log('listening on port 3000');
})