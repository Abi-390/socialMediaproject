const Imagekit = require("imagekit");



const imagekit = new Imagekit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});


async function uploadFile(file,filename){
try{
    const response = await imagekit.upload({
        file : file,
        fileName : filename,
        folder : "SocialMediaProject"
    })
    return response;}
    catch(err){
        res.json({
            message:"Image kit upload error",err
        })
    }

}

module.exports = uploadFile;