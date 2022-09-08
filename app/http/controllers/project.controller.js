const { ProjectModel } = require("../../models/project");

class ProjectController{
    async createProject(req, res, next){
        try {
            const {title, text, image, tags}= req.body;
            const owner= req.user._id
            const result= await ProjectModel.create({title, text, owner, image, tags});
            if(!result) throw {status: 400, message:"پروژه ایجاد نشد. لطفا مجددا تلاش فرمایید"};
            return res.status(201).json({
                status: 201,
                success: true,
                message: "پروژه با موفقیت ایجاد شد"
            })

            
        } catch (error) {
            next(error)
        }

    }
    getAllProject(){

    }
    getProjectById(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){

    }
}
module.exports={
    ProjectController: new ProjectController()
}