const fileupload= require("express-fileupload");
const path= require("path");
const { createUploadPath } = require("./functions");
const uploadFile= async(req, res, next)=> {
    try {
        if(req.file || Object.keys(req.files).length == 0) throw "لطفا تصویر شاخص پروژه را آپلود نمایید";
        let image= req.files.image;
        let type= path.extname(image.name);
        if(![".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(type)) throw{status: 400, message: "فرمت تصویر ارسال شده صحیح نمیباشد"}
        const image_path= path.join(createUploadPath(), (Date.now() + type))
        req.body.image= image_path.substring(7);
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