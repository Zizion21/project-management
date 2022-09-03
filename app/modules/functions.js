function expressValidatorMapper (errors = []){
    let messages= {};
    errors.forEach(err =>{
        messages[err.param] = err.msg;

    })
    return messages
}
module.exports={
    expressValidatorMapper
}