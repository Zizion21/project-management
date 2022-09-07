const fileupload= require("express-fileupload");
const path= require("path");
const { createUploadPath } = require("./functions");
const uploadFile= async(req, res, next)=> {
    try {
        if(req.file || Object.keys(req.files).length == 0) throw "لطفا تصویر شاخص پروژه را آپلود نمایید";
        let image= req.files.image;
        let uploadPath= path.join(__dirname, "..", "..", createUploadPath(), image.name);
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
        next(error);
    }
}
module.exports={
    uploadFile
}