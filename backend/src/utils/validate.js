const validator = require("validator")
const validate = (data)=>{
    const mandatoryFields = ["firstName","lastName","userName","emailId","password"]

    const isAllowed = mandatoryFields.every((k)=>Object.keys(data).includes(k))

    if(!isAllowed){
        throw new Error("Some fields Missing")
    }

    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid Email")
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password")
    }
}

module.exports = validate