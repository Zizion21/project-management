const {body}= require("express-validator");
function register(){
    return [
        body("username").custom((value, ctx)=> {
            if(value){
                const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test){
                    return true
                } throw "نام کاربری صحیح نمیباشد"

            } throw "نام کاربری نمیتواند خالی باشد"
        })

    ]
}