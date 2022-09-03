const { AuthController } = require("../http/controllers/auth.controller");
const {registerValidator}= require("../http/validations/auth")
const router= require("express").Router();

router.post("/register",registerValidator(), AuthController.register)
module.exports= {
    authRoutes : router
}