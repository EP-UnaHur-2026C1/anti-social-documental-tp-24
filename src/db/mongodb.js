const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://root:example@database:27017/unahur?authSource=admin'

const connectToDatabase = async() => {
    await mongoose.connect(MONGO_URL)
    console.log("Conexión realizada con éxito")
}

module.exports = {mongoose, connectToDatabase}