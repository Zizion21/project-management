const { body } = require("express-validator");

function createProjectvalidator(){
    return[
        body("title").notEmpty().withMessage("لطفا عنوانی برای پروژه انتخاب کنید"),
        body("text").notEmpty().isLength({min: 20}).withMessage("توضیحی با حداقل 20 کاراکتر برای پروژه بنویسید")
    ]
}

module.exports={
    createProjectvalidator
}