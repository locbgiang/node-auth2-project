const jwt = require('jsonwebtoken');
const configVars = require('../config/vars');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, configVars.jwSecret, (error, decodedToken)=>{
            if(error){
                res.status(401).json({
                    YOU: 'CANNOT PASS!'
                });
            } else {
                req.jwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({
            message: 'Please provide the authentication information'
        });
    }
};