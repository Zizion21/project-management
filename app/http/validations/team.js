const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator(){
    return [
        body("name").isLength({min: 5}).withMessage("نام تیم نمیتواند کمتر از 5 کاراکتر باشد"),
        body("description").notEmpty().withMessage("لطفا توضیحی برای تیم وارد کنید"),
        body("username").custom(async(username)=> {
            const usernameRegep= /^[a-z]+[a-z0z9\_\.]{3,}$/gim;
            if(usernameRegep.test(username)){
                const team= await TeamModel.findOne({username});
                if(team) throw "این نام کاربری قبلا استفاده شده است. لطفا نام دیگری انتخاب کنید";
                return true
            }
            throw "نام کاربری را به طور صحیح وارد کنید"
        })]
}
// function inviteToTeam(){
//     return [
//         param("teamID").custom(async(teamID, {req})=>{
//             const userId=req.user._id;
//             const team= await TeamModel.findOne({ $or:
//             [{owner: userId}, {users: userId}], _id:teamID
//         })
//         if(!team) throw "تیمی برای دعوت ممبر یافت نشد";

//         })

//     ]
// }

module.exports={
    createTeamValidator
}