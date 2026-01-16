const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()})

router.post("/",authMiddleware,upload.single("image"), createPostController);

module.exports = router;
