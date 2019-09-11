var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var express = require('express');
const ap = express();
var jwt = require('jsonwebtoken');
var connection = require('./../config');
const cookieParser = require('cookie-parser');


module.exports.authenticate = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;


    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            });
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    jwt.sign({ email, password },
                        'secretkey',
                        { expiresIn: '10days' },
                        (err, token) => {
                            console.log('token:' + token);
                            module.exports = token;
                            console.log(token);
                            res.cookie('jwt', token);
                            res.cookie('Auth', 'true');
                            res.cookie('UName', email);
                            res.redirect('/home.html');

                        }

                    );


                } else {
                    res.redirect('/login.html');
                    console.log("Wrong Input");

                }

            }
            else {
                res.redirect('/login.html');
            }
        }
    });
};
