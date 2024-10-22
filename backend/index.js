const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

let fileDescriptor; 

app.post('/file/open', (req, res) => {
  const { fileName } = req.body;
  
  fs.open(fileName, 'w', (err, fd) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open the file', error: err });
    }
    fileDescriptor = fd;
    res.status(200).json({ message: 'File opened successfully', fileName });
  });
});


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('home', {num: num});
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})