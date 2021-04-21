const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const _ = require("lodash")
const randtoken = require("rand-token")
var  nodemailer = require("nodemailer")

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: __dirname + '/upload/image' })
var refreshTokens = {}
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox1d159850d78643cbb0a612c6f40f9660.mailgun.org?';
const mg = mailgun({ apiKey: process.env.api_key, domain: DOMAIN });



exports.getAll_user = (req, res) => {

    UserModel.find({})
        .then(resultat => {
            res.send(resultat)
        }

        )

}
exports.getById = (req, res) => {

    var id = req.params.id;
    UserModel.findOne({ _id: id })
        .then((result) => {
            res.send(result);
        })
}
exports.delete_user = (req, res) => {
    var id = req.params.id;
    UserModel.remove({ _id: id })
        .then((result) => {
            res.send(result)
        })

}

exports.update_user = (req, res) => {
    var id = req.params.id;
    UserModel.updateOne({ _id: id }, req.body)
        .then((result) => {
            res.send(result)
        })


}
exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    UserModel.findOne({ email: email })
        .then((result) => {
            if (!result) {
                res.status(403).send({ msg: 'undefined user' })
            } else {
                bcrypt.compare(password, result.password, (err, success) => {
                    if (!success) {
                        res.status(403).send({ msg: 'invalid password' })
                    } else {
                      /*  var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'chrifa.bahrouni123@gmail.com',
                              pass: '@.11963235'
                            }
                          });
                          
                          var mailOptions = {
                            from: 'chrifa.bahrouni123@gmail.com',
                            to: 'asplusannonces@gmail.com',
                            subject: 'Sending Email using Node.js',
                            text: 'That was easy!'
                          };
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });*/

                          const data = {
                            from: 'chrifa.bahrouni123@gmail.com',
                            to: 'csplusannonces@gmail.com',
                            subject: 'Hello',
                            text: '<p>http:127.0.0.1:5000/users/resetpassword/</p>'
                        }; 
                        mg.messages().send(data, function (error, body) {
                        
                            if (error) {
        
                                console.log("ffff", error)
        
                                return res.json({ err: "error" })
        
                            } else {
                            
                                return res.json({ message: "email has been send" });
        
                            }
                           
                        });
                        res.send(result);
                    }
                })
            }
        })
}
exports.register = (req, res) => {
    var email = req.body.email;

    UserModel.findOne({ email: email })
        .then((result) => {
            if (result) {
                res.status(403).send({ msg: "utilisateur  exist" })
            } else {
                var user = new UserModel(req.body);

                //generate private key

                bcrypt.genSalt(10, (error, key) => {

                    //hash password
                    bcrypt.hash(user.password, key, (hash_err, hash_pwd) => {
                        user.password = hash_pwd;
                        user.save()
                            .then((saved_user) => {
                                res.send(saved_user)
                            })
                    })
                })
            }
        })
}
//ajouter un mot de passe 
exports.resetpassword = (req, res) => {

    const { resetLink, newPass } = req.body;

    if (resetLink) {

        jwt.verify(resetLink, req.app.get('secretKey'), function (err, decodeData) {

            if (err) {

                return res.json({

                    error: "incorrect token or it is exprired"

                })

            }

            UserModel.findOne({ resetLink }, (err, user) => {

                if (err || !user) {

                    return res.json({ error: "user with this token does not exist" });

                }

                const obj = {

                    password: newPass

                }

                user = _.extend(user, obj);

                user.save((err, result) => {

                    if (err) {

                        return res.status(400).json({ error: "reset password error" });

                    }

                    else {

                        return res.status(200).json({ message: "password has been changed" });

                    }

                })

            })

        })

    }

    else {

        return res.status(401).json({ error: "authentification erreur" });

    }
}
exports.forgotpassword = (req, res) => {

    const { email } = req.body;

    UserModel.findOne({ email }, (err, user) => {

        if (err || !user) {

            return res.status(400).json({ error: "email does not exist" });

        }

        const token = jwt.sign({ _id: user._id }, process.env.REST_PASSWORD_KEY, { expiresIn: '20min' }); //req.app.get('secretKey')

      const data = {

            from: "chrifa.bahrouni123@gmail.com",

            to: email,

            subject: "activation email",

            html: `<p>http:127.0.0.1:5000/users/resetpassword/${token}</p>`

        };

       
        return UserModel.updateOne({ resetLink: token }, (err, succes) => {

            if (err) {
 
                return res.status(400).json({ error: "reset password link error" });

            }

            else {
               
                mg.messages().send(data, function (error, body) {
                    console.log(body);
                    console.log(body);
                    if (error) {

                        console.log("ffff", error)

                        return res.json({ err: "error" })

                    } else {
                    
                        return res.json({ message: "email has been send" });

                    }
                   
                });

                /*  const transporter = nodemailer.createTransport({
  
                      service: 'gmail',
  
                      auth: {
  
                          user: 'chrifa.bahrouni123@gmail.com',
  
                          pass: '@.119632352FA'
  
                      }
  
                  });
  
                  transporter.sendMail(data, function (error, info) {
  
                      if (error) {
  
                          console.log("ffff", error)
  
                          return res.json({ err: "error" })
  
                      } else {
  
                          return res.json({ message: "email has been send" });
  
                      }
  
                  });
  
  */



            }

        })



    })


}
exports.refreshToken = (req, res) => {
    var id = req.body._id
    var refreshToken = req.body.refreshToken
    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)) {

        var token = jwt.sign(id, app.get("secretkey"), { expiresIn: "1h" })
        res.json({ token: token })
    }
    else {
        res.send(401)
    }

}

exports.logout = (req, res) => {
    var refreshToken = req.body.refreshToken //hadha token ili 5theh l user
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken]
    }
    res.send(204)


}

exports.authenticate = (req, res) => {
    UserModel.findOne({ email: req.body.email }, function (err, userinfo) {

        if (err) {
            console.log(err)
        }
        else {
            if (userinfo != null) {

                console.log(userinfo.password)
                console.log(req.body.password)

                if (bcrypt.compare(req.body.password, userinfo._id)) { // bch ycompari bin password fi base w mdp ili da5elneh
                    const token = jwt.sign({ id: userinfo._id },
                        req.app.get("secretkey"), { expiresIn: "1h" })
                    const refreshToken = randtoken.uid(256)
                    refreshTokens[refreshToken] = userinfo._id //bch naatih wqt l token mt3o 


                    res.json({
                        status: "succes",
                        message: "user found",
                        data: {
                            user: userinfo,
                            accesstoken: token,
                            refreshtoken: refreshToken
                        }
                    })
                }
                else {
                    res.json({
                        status: "error",
                        message: "invalid password",
                        data: null
                    })
                }

            } else {

                res.json({
                    status: "error",
                    message: "invalid email",
                    data: null
                })

            }
        }

    })





}
 


