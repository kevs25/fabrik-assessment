// importing packages
const express = require('express');

const path = require('path');


const app = express();

//middlewars
app.use(express.static(staticPath));
app.use(express.json());

//signup route
app.get('/signup', (req,res) =>{
    res.sendFile(path.join(staticPath, "signup.html"));
})

//routes
//Cart
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})
  

//home routes
app.get("/index", (req, res) =>{
    res.sendFile(path.join(staticPath, "index.html"));
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000......');
})