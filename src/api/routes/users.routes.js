const { Router } = require('express');
const router = Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');

router.post('/api/register', async (req, res) => {
    const status = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        status.push({ Text: 'Password do no match', errorCode: 1, data: {} });
    }
    if (password.length < 4) {
        status.push({ Text: 'Passwords must be at least 4 characters', errorCode: 2, data: {} });
    } else {
        const emailuser = await User.findOne({ email: email });
        if (emailuser) {
            status.push({ Text: 'the email is already in use', errorCode: 3, data: {} });
            
        }
        else {
            const newUser = new User({ name, email, password, isAdmin: false });
            // console.log(newUser);
            newUser.password = password;
            // console.log(await newUser.encryptPassword(password));
            await newUser.save();
            status.push({ Text: 'OK', errorCode: 0, data: newUser });
        }
    }
    res.json(status);
});

router.post('/api/login', async (req, res) => {
    const status = [];
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        status.push({ Text: 'User not found', errorCode: 4, data: {} });

    }
    else if(user!=undefined && user.password == password){
        status.push({ Text: 'Invalid Password', errorCode: 5, data: {} });
    }
    else {


        // create token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET || '$2a$10$gg0JgQDoHOdaDOFqAcNXpe72gz5d.x5TnTFhQxjbYzHbxSEjpBWSC');


        status.push({ Text: 'OK','auth-token': token, errorCode: 0, data: { user} });

        res.header('auth-token', token);
    }

    res.json(status);
});




module.exports = router;
