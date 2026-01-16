const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware (req, res, next){
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: " Unauthorized access, Login first and try again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token , login again",
    });
  }
};

module.exports = authMiddleware;
