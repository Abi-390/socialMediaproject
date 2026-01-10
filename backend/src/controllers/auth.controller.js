 const userModel = require("../models/user.model")

async function registerController(req,res) {
    const {username,password} = req.body;

    const isUserAlreadyExists = userModel.findOne({username});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const user = await userModel.create({
        username,password
    })
}

async function loginController(req,res) {
    const {username,password} = req.body;
}





module.exports = {
    registerController,
    loginController
}