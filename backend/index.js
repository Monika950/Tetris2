const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors()); 
app.use(express.json());

let fileDescriptor; 

app.post('/file/open', (req, res) => {
    const { fileName } = req.body;
    
    if (!fileName) {
      return res.status(400).json({ message: 'Please provide a file name' });
    }
  
    fs.open(fileName, 'w', (err, fd) => {
      if (err) {
        console.error('Error opening the file:', err); 
        return res.status(500).json({ message: 'Failed to open the file', error: err.message });
      }
      fileDescriptor = fd; 
      res.status(200).json({ message: 'File opened successfully', fileName });
    });
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
    if (!fileDescriptor) {
      return res.status(400).json({ message: 'No file opened to close' });
    }
  
    fs.close(fileDescriptor, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to close the file', error: err });
      }
      fileDescriptor = null; 
      res.status(200).json({ message: 'File closed successfully' });
    });
  });

app.listen(3000, () => {
    console.log('listening on port 3000');
})