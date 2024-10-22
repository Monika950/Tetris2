const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//console.dir(app)

// app.use((req,res) => {
//     console.log('new request');
//     //res.send("hello, this is the response");
//     //res.send({color: 'green'});
//     res.send("<h1>hello, this is the response</h1>");
//     });

app.get('/', (req, res) => {
    res.send('home page');
})

app.get('/r/:sub', (req, res) => {
    const {sub} = req.params;
    res.send(`<h1>${sub}<h1/>`);
})

app.get('/search', (req, res) => {
    const {q} = req.query;
    if(!q) 
    {
        res.send(`<h1>nothing searched/<h1/>`);
    }
    res.send(`<h1>${q}<h1/>`);
})

app.get('/cats', (req, res) => {
    res.send('meow');
})

app.post('/cats', (req, res) => {
    res.send('POSTT meow');
})

app.get('*', (req, res) => {
    res.send('default I dont know');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})