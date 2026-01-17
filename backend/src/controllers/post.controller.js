const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        code: "NO_FILE",
        message: "Please select an image to upload.",
      });
    }

    const base64Image = Buffer.from(file.buffer).toString("base64");

    let caption;

    
    try {
      caption = await generateCaption(base64Image);
    } catch (err) {
      console.error("Gemini AI error:", err);

      return res.status(429).json({
        code: "AI_RATE_LIMIT",
        message:
          "Free AI request limit reached for now. Please try again later.",
      });
    }

    let result;

    
    try {
      result = await uploadFile(file.buffer, uuidv4());
    } catch (err) {
      console.error("Image upload error:", err);

      return res.status(503).json({
        code: "SERVER_COLD_START",
        message: "Please wait, our backend servers are starting.",
      });
    }

    const post = await postModel.create({
      caption,
      image: result.url,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("Unexpected server error:", err);

    return res.status(503).json({
      code: "SERVER_COLD_START",
      message: "Please wait, our backend servers are starting.",
    });
  }
}

async function deletePostController(req, res) {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await post.deleteOne();

    return res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete post",
    });
  }
}

module.exports = {
  createPostController,
  deletePostController,
};
