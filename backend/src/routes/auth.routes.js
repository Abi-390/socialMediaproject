const { registerController, loginController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);


router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
