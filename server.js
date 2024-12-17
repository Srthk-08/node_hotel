const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const MenuItem = require('./models/MenuItem');

var port = 3000;

app.get('/', function (req, res) {
  res.send('Welocome to our Hotel')
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the router files
app.use('/person',personRoutes);
app.use('/menu', menuRoutes);

app.listen(port, () => {
  console.log('Listening on port ' + port);
})
