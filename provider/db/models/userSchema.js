const mongoose = require("mongoose")



const connectMongoose = async ()=>{
    try {
        const docRef = await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected with mongodb")
        
    } catch (error) {
        console.log(error)
    }
}

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String}
})


const userModel = mongoose.model("oidc_user", userSchema)


module.exports = {userModel, userSchema, connectMongoose}