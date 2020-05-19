//all end points goes here

const express = require('express');
const server = express();

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');

server.use(express.json());


server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req,res)=>{
    res.json({API: "UP"});
});

module.exports = server;