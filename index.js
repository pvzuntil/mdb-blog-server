const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRoute = require('./route/authRoute')

dotenv.config();

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.DB_ADDRESS, mongooseConfig, () => {
    console.log('DB CONNECT');
})

app.use(express.json())
app.use('/api/user', authRoute)

app.listen(3000, () => {
    console.log('Runing !');
})