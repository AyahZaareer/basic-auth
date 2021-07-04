'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');


const singInMiddleware = require('./middleware/basic');

const modelUser = require('./models/user-model');

router.post('/singup', singupHandler);
router.post('/singin', singInMiddleware, singinHandler);

async function singinHandler(req, res) {
    res.json(req.user);
}



// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
async function singupHandler(req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const exist = await modelUser.findOne({ username: req.body.username }); //null
        if (exist) throw new Error('User exist');
        const user = new modelUser(req.body);
        const doc = await user.save();
        res.status(201).json(doc);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

module.exports = router;




