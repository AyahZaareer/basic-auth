'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');


const signInMiddleware = require('./middleware/basic');

const User = require('./models/user-model');

router.post('/signup', signupHandler);
router.post('/signin', signInMiddleware, signinHandler);

async function signinHandler(req, res) {
    res.json(req.user);
}



// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
async function signupHandler(req, res) {
    try {


        req.body.password = await bcrypt.hash(req.body.password, 10);
        const exist = await User.findOne({ username: req.body.username }); //null
        if (exist) throw new Error('User exist');
        const user = new User(req.body);
        // console.log('user login', user);
        user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(403).json('user not create');
    }
}

module.exports = router;




