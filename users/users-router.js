//endpoints for users

const router = require('express').Router();
const Users = require('./users-model');

const restricted = require('../auth/restricted-middleware');
router.use(restricted);

router.get('/',(req,res)=>{
    Users.find()
        .then(users=>{
            res.status(200).json({
                users, jwt: req.jwt
            })
        }).catch(err=>{
            console.timeLog(err);
            res.status(500).json({
                error: err.message
            })
        })
});




module.exports = router;