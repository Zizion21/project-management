const mongoose= require("mongoose");
const UserSchema= mongoose.Schema({
    first_name : {type: String},
    last_name : {type: String},
    username : {type: String, required: true, unique: true},
    mobile : {type: String, required: true, unique: true},
    roles : {type: String, default: ["USER"]},
    emaile : {type: String, required: true},
    password : {type: String, required: true},
    skills : {type: String, default: []},
    teams : {type: String, default: []}
},{
    timestamps: true
})
const UserModel= mongoose.model("user", UserSchema);

module.exports={
    UserModel
}