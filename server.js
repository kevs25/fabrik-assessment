// importing packages
const express = require('express');
const path = require('path');

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
app.get('/model1', (req,res) =>{
    res.sendFile(path.join(staticPath, "model.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
})
//home routes
app.get("/", (req, res) =>{
    res.sendFile(path.join(staticPath, "index.html"));
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000......');
})