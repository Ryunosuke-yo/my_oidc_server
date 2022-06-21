const express = require("express");
const port = 8080
const app = express()
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
    res.render("pages/login_shimasuka")
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})