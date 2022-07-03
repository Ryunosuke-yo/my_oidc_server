const express = require("express");
const crypto = require('crypto')
const { default: axios } = require("axios");
const { parse } = require("querystring");

const port = 8080
const app = express()
app.set('view engine', 'ejs');

const client_id = 'client_id'
const client_secret = 'client_secret'
const redirect_uri = 'http://localhost:8080/redirect_claim_token'
const providerUrl = 'http://localhost:3000/auth'
const S = "jdheidya8301ehjcdakbcdwaufce833gacuecilrge3dke84hfewu34rbhew"
const N = 16



app.get("/", (req, res)=>{
    res.render("pages/login_shimasuka")
})

app.get('/auth', (req, res)=>{
    const state = crypto.randomBytes(N).toString('base64').substring(0, N)
    const scope = "profile"
    // console.log(state)
    const url = providerUrl + "?response_type=code" + "&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope +"&state=" + state
    res.redirect(url)
})


app.get("/redirect_claim_token", async(req, res)=>{
    const response = await axios.post("http://localhost:3000/token",{
        state : parse(req.url).state
    })
    console.log(response.data)

    // res.redirect("/getinfo")
    const url = "http://localhost:3000/userinfo"
    const info =  await axios.get(url)
    console.log(info.data)
    res.send(info.data)

})

app.get("/getinfo", (req, res)=>{
})
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})