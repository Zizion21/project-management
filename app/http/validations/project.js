const { body } = require("express-validator");

function createProjectvalidator(){
    return[
        body("title").notEmpty().withMessage("لطفا عنوانی برای پروژه انتخاب کنید"),
        body("tags").isArray({min: 0, max: 10}).withMessage("حداکثر تعداد هشتگ ها 10 عدد میباشد"),
        body("text").notEmpty().isLength({min: 20}).withMessage("توضیحی با حداقل 20 کاراکتر برای پروژه بنویسید")
    ]
}

module.exports={
    createProjectvalidator
}