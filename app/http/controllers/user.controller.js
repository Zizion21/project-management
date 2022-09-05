const res= require("express/lib/response");
const {json}= require("express/lib/response");

class UserController{
    getProfile(req, res, next){
        try {
            const user= req.user;
            return res.status(200).json({
                status:200,
                user
            })
        } catch (error) {
            next(error)
        }

    }
    editProfile(){

    }
    addSkills(){

    }
    updateSkills(){

    }
    acceptInviteInTeam(){

    }
    rejectInviteInTeam(){

    }
}
module.exports={
    UserController: new UserController()
}