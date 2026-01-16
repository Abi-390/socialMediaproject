const express = require('express');
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/",(req,res)=>{
    const token = req.body.token;

    if(!token){
        return res.status(401).json({
            message:" Unauthorized access, Login first and try again"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token , login again"
        })
    }
})



module.exports = router;