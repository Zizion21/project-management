const { param } = require("express-validator");

function mongoIDValidator(){
    return [
        param("id").isMongoId().withMessage("آیدی وارد شده صحیح نمیباشد")
    ]
}

module.exports={
    mongoIDValidator
}