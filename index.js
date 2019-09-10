var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var connection = require('./config');
var app = express();
var authenticateController = require('./public/authenticate-controller');
var registerController = require('./public/register-controller');
var dir = path.join(__dirname, 'public');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir));


console.log(authenticateController);
app.post('/public/register-controller', registerController.register);
app.post('/public/authenticate-controller', authenticateController.authenticate);
app.listen(8012);
