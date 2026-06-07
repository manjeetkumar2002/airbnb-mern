const mongoose = require("mongoose")
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING
const main = async()=>{
    await mongoose.connect(DB_CONNECT_STRING)
}

module.exports = main