const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//console.dir(app)

// app.use((req,res) => {
//     console.log('new request');
//     //res.send("hello, this is the response");
//     //res.send({color: 'green'});
//     res.send("<h1>hello, this is the response</h1>");
//     });

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