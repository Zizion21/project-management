const fileupload= require("express-fileupload");
const path= require("path");
const { createUploadPath } = require("./functions");
const uploadFile= async(req, res, next)=> {
    try {
        if(req.file || Object.keys(req.files).length == 0) throw "لطفا تصویر شاخص پروژه را آپلود نمایید";
        let image= req.files.image;
        const image_path= path.join(createUploadPath(), (Date.now() + path.extname(image.name)))
        req.body.image= image_path;
        let uploadPath= path.join(__dirname, "..", "..", image_path);
        console.log(uploadPath);
        console.log(image);
        image.mv(uploadPath, (err)=> {
            if(err) throw{
                status: 500,
                message: "بارگزاری تصویر انجام نشد"
            }
            next();
        })
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}
module.exports={
    uploadFile
}