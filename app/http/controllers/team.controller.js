const autoBind = require("auto-bind");
const {TeamModel}= require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController{
    constructor(){
        autoBind(this)
    }
    async createTeam(req, res, next){
        try {
            const {name, username, description}= req.body;
            const owner= req.user._id;
            const team= await TeamModel.create({
                name,
                description,
                username,
                owner
            })
            if(!team) throw {status: 500, message:"ایجاد تیم با خطا مواجه شد"};
            return res.status(201).json({
                status: 201,
                success: true,
                message: "تیم با موفقیت ایجاد شد"
            })
            
        } catch (error) {
            next(error)
        }

    }
    async getListOfTeam(req, res, next){
        try {
            // const owner= req.user._id;
            const teams= await TeamModel.find({});
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async getTeamById(req, res, next){
        try {
            const teamID= req.params.id;
            const team= await TeamModel.findById(teamID);
            if(!team) throw{status: 404, message:"تیمی یافت نشد"};
            return res.status(200).json({
                status: 200,
                success: true,
                team
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getMyTeams(req, res, next){
        try {
            const userID= req.user._id;
            const teams=await TeamModel.aggregate([
                {
                    $match: {
                        $or: [{owner: userID}, {users: userID}]
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                        "owner.roles": 0,
                        "owner.password": 0,
                        "owner.token": 0,
                        "owner.skills": 0,
                        "owner.teams": 0,
                        "owner.inviteRequests": 0
                    }
                },
                {
                    $unwind: "$owner"
                }
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
            
        } catch (error) {
            next(error)
        }
    }
    async removeTeamById(req, res, next){
        try {
            const teamID= req.params.id;
            const team= await TeamModel.findById(teamID);
            if(!team) throw{ status: 404, message:"تیمی یافت نشد"};
            const result= await TeamModel.deleteOne({_id: teamID})
            if(result.deletedCount == 0) throw {status: 500, message:"تیم حذف نشد لطفا مجددا تلاش کنید"};
            return res.status(200).json({
                status: 200,
                success: true,
                message:"تیم با موفقیت حدف شد"
            })
        } catch (error) {
            next(error)
        }

    }
    async findUserInTeam(teamID, userID){
        const result= await TeamModel.findOne({
            $or: [{owner: userID}, {users: userID}],
            _id: teamID
        })
        return !!result
    }
    async inviteUserToTeam(req, res, next){
        try {
            const userID= req.user._id;
            const {username, teamID}= req.params;

            const team= await this.findUserInTeam(teamID, userID);
            if(!team) throw {status: 400, message: "تیمی برای دعوت ممبر یافت نشد"}

            const user= await UserModel.findOne({username});
            if(!user) throw{ status: 400, message: "کاربری برای دعوت به گروه یافت نشد"}

            const userInvited= await this.findUserInTeam(teamID, user._id)
            if(userInvited) throw {status: 400, message: "این کاربر در تیم عضو میباشد"}

            const request={
                caller: req.user._id,
                requestDate: new Date(),
                teamID,
                status: "accepted"
            }
            const updateUserResult= await UserModel.updateOne({username},{
                $push: {inviteRequests: request}
            })
            if(updateUserResult.modifiedCount == 0) throw {status: 500, message: "درخواست دعوت ثبت نشد لطفا مجددا تلاش کنید"};
            return res.status(200).json({
                status: 200,
                success: true,
                message: "درخواست دعوت کاربر با موفقیت ثبت شد "
            })
           
        } catch (error) {
            next(error)
        }
    }
    async updateTeam(req, res, next){
        try {
            const data= {...req.body};
            Object.keys(data).forEach(key => {
                if(!data[key]) delete data[key];
                if(["", " ", null, undefined, NaN].includes(data[key])) delete data[key];

            })
            const userID= req.user._id;
            const {teamID}= req.params;
            const team= await TeamModel.findOne({owner: userID, _id: teamID});
            if(!team) throw{status: 404, message:"تیم با چنین مشخصاتی یافت نشد"};
            const teamEditResult= await TeamModel.updateOne({_id: teamID}, {$set: data});
            if(teamEditResult.matchedCount == 0) throw {status: 500, message: "بروزرسانی انجام نشد"};
            return res.status(200).json({
                status: 200,
                success: true,
                message: "بروزرسانی با موفقیت انجام شد"
            })
            
        } catch (error) {
            next(error)
        }

    }
    removeUserFromTeam(){
        
    }
}
module.exports={
    TeamController: new TeamController()
}