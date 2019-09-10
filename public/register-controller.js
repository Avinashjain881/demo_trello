var connection = require('/home/codemymobile/study/trello/config');
var Cryptr = require('cryptr');
var express = require("express");
var cryptr = new Cryptr('myTotalySecretKey');
module.exports.register = function (req, res) {
    var encryptedString = cryptr.encrypt(req.body.password);
    var sql = 'insert into users(name, email, password) values ?';
    var values = [[req.body.name, req.body.email, encryptedString]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        res.redirect('/login.html');
    });
};