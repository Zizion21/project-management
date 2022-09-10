const fileUpload = require("express-fileupload");
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectvalidator } = require("../http/validations/project");
const { mongoIDValidator } = require("../http/validations/public");
const { uploadFile } = require("../modules/express-fileupload");

const router= require("express").Router();

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectvalidator(), expressValidatorMapper, ProjectController.createProject)
router.get("/list", checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)
router.put("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject)

module.exports= {
    projectRoutes : router
}