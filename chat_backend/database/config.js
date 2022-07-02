const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CN);
        console.log("Connect DB");


    } catch (error) {
        console.log(error);
        throw new Error("Error")
    }
}

module.exports = { dbConnection }