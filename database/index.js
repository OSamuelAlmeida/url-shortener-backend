const mongoose = require('mongoose')

const connectToDatabase = async () => {
  try {
    const mongo_uri = `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    const connection = await mongoose.connect(mongo_uri)

    console.log(`Connected to database ${connection.connection.name} at ${connection.connection.host}:${connection.connection.port}`)
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

module.exports = connectToDatabase