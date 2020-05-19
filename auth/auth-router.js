//creating register, login, logout
//hashing password when register
//require user functions from user-model.js

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const Users = require('../users/users-model');
const {isValidRegister, isVlaidLogin} = require('../users/users-service');
const configVars = require('../config/vars');

router.post('/register',(req,res)=>{
    const credentials = req.body;

    if(isValidRegister(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8; //how many rounds of encryptions 
        const hash = bcryptjs.hashSync(credentials.password, rounds) //hashing the password;
        credentials.password = hash;

        //saving the newly created user with hashed password
        Users.add(credentials).then(user=>{
            res.status(201).json({
                data: user
            });
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
    } else {
        res.status(400).json({
            message: 'Please provide username, password (string), and department of the user.'
        });
    }
});

router.post('/login',(req,res)=>{
    if(isVlaidLogin(req.body)){
        Users.findBy({username: req.body.username}).then(([user])=>{
            if(user && bcryptjs.compareSync(req.body.password, user.password)){  //comparing the input password to the stored password
                const token = generateToken(user); //produce (sign) and send the token
                res.status(200).json({
                    message: 'Log in successful' ,token
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }).catch(err=>{
            res.status(500).json({
                message: err.message
            });
        });
    } else {
        res.status(400).json({
            message: "Please provide username and password, the password should be alphanumeric"
        });
    }
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    }
    const options = {
        expiresIn: '8h',
    }
    return jwt.sign(payload, configVars.jwSecret, options)
}

module.exports = router;