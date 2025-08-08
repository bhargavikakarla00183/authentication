const express = require('express')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
const app = express()
const PORT = 9000
app.use(express.json())
dotEnv.config()
const secretKey = process.env.mySecretKey
const users = [{
    id: "1",
    username: "bhargavi",
    password: "bhargavi",
    isAdmin: true
},
{
    id: "2",
    username: "navya",
    password: "navya",
    isAdmin: false
}
]
app.post('/api/login',(req,res) =>{
    const {username, password } = req.body;

    const user = users.find((person)=>{
      return person.username === username && person.password === password
    });
    if(user){
         const accessToken=jwt.sign({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
         },secretKey);
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        });
    }else{
        res.status(401).json("user credentials not matched")
    }
});

app.listen(PORT, () => {
    console.log(`Server started and running @${PORT}`)
});