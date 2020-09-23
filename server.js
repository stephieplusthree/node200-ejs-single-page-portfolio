const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var profile = require('./profile');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true}));

app.use(express.static("public"));

// Here we're setting the views directory to be ./views
// thereby letting the app know where to find the template files
app.set('views', './views');

// Here we're setting the default engine to be ejs
// note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// Now instead of using res.send we can use
// res.render to send the output of the template by filename
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/resume', (req, res) => {
    res.render('resume', { title: 'Resume Page', });
});

app.post('/thanks', (req, res) => {
    res.render('thanks', { contact: req.body })
});

// then define the route that will use your custom router
app.use('/profile', profile)

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});