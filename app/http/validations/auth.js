const {body}= require("express-validator");
function registerValidator(){
    return [
        body("username").custom((value, ctx)=> {
            if(value){
                const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test){
                    return true
                } throw "نام کاربری صحیح نمیباشد"

            } throw "نام کاربری نمیتواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد"),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمیباشد"),
        body("password").isLength({min: 6, max: 16}).withMessage("رمز عبور باید بین 6 الی 16 کاراکتر باشد")
        .custom((value, ctx)=>{
            if(!value) throw "رمز عبور نمیتواند خالی باشد";
            if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن برابر نمیباشد";
            return true
        })

    ]
}

module.exports={
    registerValidator
}