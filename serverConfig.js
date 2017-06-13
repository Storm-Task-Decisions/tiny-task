const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes.js');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.use(express.static(__dirname + '/tiny-task-app/dist'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/tiny-task-app/dist/index.html');
});

module.exports = app;