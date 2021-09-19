const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const connectToDatabase = require('./database')
const router = require('./routes')

dotenv.config({ path: '.env' })

connectToDatabase()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', router)

if (process.env.NODE_EV == 'development') {
  app.use(morgan('combined'))
}

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(`Running ${process.env.NODE_ENV} server on port ${PORT}`)
)