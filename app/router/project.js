const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectvalidator } = require("../http/validations/project");

const router= require("express").Router();

router.post("/create",checkLogin, createProjectvalidator(), expressValidatorMapper, ProjectController.createProject)
module.exports= {
    projectRoutes : router
}