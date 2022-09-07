const fileUpload = require("express-fileupload");
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectvalidator } = require("../http/validations/project");
const { uploadFile } = require("../modules/express-fileupload");

const router= require("express").Router();

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectvalidator(), expressValidatorMapper, ProjectController.createProject)
module.exports= {
    projectRoutes : router
}