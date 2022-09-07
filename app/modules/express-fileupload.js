const fileupload= require("express-fileupload");
const path= require("path");
const { createUploadPath } = require("./functions");
const uploadFile= async(req, res, next)=> {
    try {
        fileupload();
        console.log(req?.file, req?.files);
        if(req.file || Object.keys(req.file).length == 0) throw "لطفا تصویر شاخص پروژه را آپلود نمایید";
        let image= req.file;
        let uploadPath= path.join(__dirname, "..", "..", createUploadPath, image.name);
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