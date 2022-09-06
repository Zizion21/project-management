const { verifyJwtToken } = require("../../modules/functions");
const {UserModel}=require("../../models/user")

const checkLogin= async(req, res, next)=>{
    try {
        // let authError= {status: 401, message:"لطفا وارد حساب کاربری خود شوید"};
        const authorization= req?.headers?.authorization;
        if(!authorization) throw {status: 401, message:"1 لطفا وارد حساب کاربری خود شوید"};
        let token= authorization.split(" ")?.[0];
        if(!token) throw {status: 401, message:"2 لطفا وارد حساب کاربری خود شوید"};
        
        const result= verifyJwtToken(token)
        const {username}= result;
        const user= await UserModel.findOne({username}, {password: 0});
        if(!user) throw {status: 401, message:"3 لطفا وارد حساب کاربری خود شوید"};
        req.user= user;
        return next();
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    checkLogin
}