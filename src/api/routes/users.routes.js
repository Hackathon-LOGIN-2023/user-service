const { Router} = require('express');
const router = Router();
const User = require("../models/User");

const { renderSigninForm, renderSignUpForm, signin, signup, logout } = require('../controllers/users.controller');

router.post('/api/signup', async (req, res)=>{
    const status = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        status.push({Text: 'Password do no match',errorCode:1,data:{}});
    }
    if(password.length < 4){
        status.push({Text: 'Passwords must be at least 4 characters',errorCode:2,data:{}});
    }else{
        const emailuser= await User.findOne({email: email});
        if (emailuser){
            status.push({Text: 'the email is already in use',errorCode:3,data:{}});
            //res.redirect('/users/signup');
        }
        else{
            const newUser = new User({name, email, password, isAdmin:false});
            // console.log(newUser);
            newUser.password = await newUser.encryptPassword(password);
            // console.log(await newUser.encryptPassword(password));
            await newUser.save();
            status.push({Text:'OK',errorCode:0, data:newUser});
        }
    }
    res.json(status);
});


// router.get('/users/signup', renderSignUpForm);

// router.post('/users/signup',signup);

// router.get('/users/signin',renderSigninForm);

// router.post('/users/signin',signin);

// router.get('/users/logout',logout);

module.exports = router;
