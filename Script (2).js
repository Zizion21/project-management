db = db.getSiblingDB("ProjectManagerDB");
db.getCollection("users").aggregate([
    {
    $match: {"username" : "zizion21"}
    },
    {
     $project: {roles: 0, skills: 0, password: 0}   
    },
    {
     $addFields:
     {
         nodejs: "express, nest, fastify"
     }   
    }
])