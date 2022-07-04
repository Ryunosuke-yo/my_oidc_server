const { default: axios } = require("axios");
const express = require("express");
const { default: mongoose } = require("mongoose");
const port = 3000
const path = require('path');
const querystring = require('querystring')
const { connectMongoose, userModel } = require("./db/models/userSchema");
const { generateAuthCode, issueToken } = require("./oath2/authorize");
require('dotenv').config()
const {State} = require("./state")



const page_url = 'http://localhost:3000'

const app = express()
const htmlPath = express.static(path.join(__dirname, './html'))
const parse = querystring.parse
const login_url = page_url + '/oath2/login'
app.set('view engine', 'ejs');

const credentials = {
    client_id : "client_id",
    client_secret : "client_secret",
    redirect_uri : "/success",
    response_type : "code"
}

const {client_id, client_secret, redirect_uri, response_type} = credentials


connectMongoose()

app.get("/", (req, res)=>{
    res.send("pages/login_shimasuka")
})



// app.get("/auth", (req, res)=>{
//     const url = login_url + '?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=' + response_type;
//     res.redirect(url)
// })




app.get("/auth", (req, res)=>{
    // console.log(req.url)
    res.render("pages/login")
    const {state: s} = parse(req.url)
    console.log(parse(req.url), "url") 
    app.locals.state = parse(req.url).state
    app.locals.id = parse(req.url).client_id
    app.locals.redirect = parse(req.url).redirect_uri
})

app.get("/authorize-process", (req, res)=>{
    let userId
    const {name, password} = req.query

    const doc = userModel.findOne({name : name, password : password}, (e, r)=>{
        console.log(r._id.toString())
        userId = r._id.toString()
        console.log(userId)
        const scope = "openid"
        const code = generateAuthCode(userId, client_id, scope)
        // res.send(`/success?code=${code}&state=${app.locals.state}`)

        res.redirect(`${app.locals.redirect}?code=${code}&state=${app.locals.state}`)
        // console.log(req.url)
    })
})

app.post("/token", (req, res)=>{
    // console.log(issueToken())
    const grant_type = 'authorization_code'
    // console.log(req.body.data)
    if(grant_type == "authorization_code"){
        res.send(issueToken())
    }
    
})


// app.get("/userinfo", (req, res)=>{
//     const aceessToken = parse(req.url)
//     res.send({
//         name : "user1",
//         email: "aa@aa.aa",
//         password : "12345"
//     })
// })


app.get("/success", (req, res)=>{
    res.render("pages/token_issued")
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})



