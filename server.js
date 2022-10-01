// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');


//firebase admin setup
let serviceAccount = require("./e-commerce-website-f3bf0-firebase-adminsdk-7aohw-f5821b10b1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//declare static path
let staticPath = path.join(__dirname, "");


//intializing express.js

const app = express();

//middlewars
app.use(express.static(staticPath));
app.use(express.json());

//signup route
app.get('/signup', (req,res) =>{
    res.sendFile(path.join(staticPath, "signup.html"));
})
app.post('/signup', (req, res) => {
    let { name, email, password, number, tac } = req.body;

    //form validations
    if(name.length < 3){
        return res.json({'alert': 'name must be three letters'});
    }
    else if(!email.length)
    {
        return res.json({'alert':'enter your email'});
    }
    else if(password.length < 8){
        return res.json({'alert':'Password should be 8 characters'});
    }
    else if(!number.length){
        return res.json({'alert':'enter your number'});
    }
    else if(!Number(number) || number.length<10 || number.length>10){
        return res.json({'alert':'Invalid number, Please enter a valid number'});
    }
    else if(!tac){
        return res.json({'alert':'You must to our terms and conditions'});
    }
    //store user in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert': 'email already exists'});
        }
        else{
            //encrypt the password before storing it
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: data.seller,
                        })
                    })
                })
            })
        }
    })
})
//routes
//Cart
app.get('/cart', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
})
app.post('/order', (req, res) => {
    const { email, add} = req.body;
    let docName = email + Math.floor(Math.random() * 123719287419824);
    db.collection('order').doc(docName).set(req.body)
    .then(data => {
        res.json('done');
    })
})  

//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
})

app.post('/login', (req, res) => {
    let {email, password} = req.body;

    if(!email.length){
        return res.json({'alert': 'Please enter the Email'})
    }
    else if(!password.length){
        return res.json({'alert': 'please enter the password'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return res.json({'alert': 'Login Email does not exists'})
        }
        else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                    })
                }
                else{
                    return res.json({'alert': 'Password is incorrect'})
                }
            })
        }
    })
})
//home routes
app.get("/", (req, res) =>{
    res.sendFile(path.join(staticPath, "index.html"));
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000......');
})