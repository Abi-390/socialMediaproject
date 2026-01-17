const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service")
const {v4 : uuidv4} = require("uuid")


async function createPostController(req,res){

    const file = req.file;
    console.log("File recieved",file);

    const base64Image =  Buffer.from(file.buffer).toString('base64');
    console.log("Base64 image:",base64Image);

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
        caption : caption,
        image : result.url,
        user : req.user._id
    })

   res.status(201).json({
    mesaage:"Post created successfully",post
   })

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

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete post",
    });
  }
}




module.exports = {createPostController,deletePostController};