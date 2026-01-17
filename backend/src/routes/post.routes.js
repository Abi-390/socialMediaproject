const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {createPostController,deletePostController} = require("../controllers/post.controller");
const router = express.Router();
const multer = require("multer");
const postModel = require("../models/post.model")

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), createPostController);//upload.single will  make the file readable by express
router.delete("/:id", authMiddleware, deletePostController);
router.get("/", authMiddleware, async (req, res) => {
  const posts = await postModel
    .find()
    .populate("user", "username")
    .sort({ _id: -1 });

  res.json(posts);
});


module.exports = router;
