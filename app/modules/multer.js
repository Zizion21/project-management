const multer= require("multer");
const path= require("path");
const { createUpdoadPath } = require("./functions");

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, createUpdoadPath())

    },
    filename: (req, file, cb)=>{
        const type= path.extname(file?.originalname || "");
        cb(null, Date.now() + type)

    }
})

const upload_multer= multer({storage});
module.exports={
    upload_multer
}