const mongoose= require("mongoose");
const ProjectSchema= mongoose.Schema({
    title : {type:String, required: true},
    text : {type:String},
    image : {type:String, default: "/defaults/default.png"},
    owner : {type:mongoose.Types.ObjectId, required: false},
    team : {type:mongoose.Types.ObjectId},
    private : {type:Boolean, default: true},
},{
    timestamps: true
});

const ProjectModel=mongoose.model("project", ProjectSchema);
module.exports={
    ProjectModel
}