const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.render('home.hbs', {students: data.students});
})

app.post('/submit', (req, res) => {
    const newData = req.body;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    data.students.push(newData);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('server running!!! go to http://localhost:3000')
});