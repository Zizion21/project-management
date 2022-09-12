db.getCollection("teams").find({ $or : [ 
    { owner : ObjectId("63189114c2ad352d99c33fd9") }, 
    { users : ObjectId("63189114c2ad352d99c33fd9") } 
    ] })
