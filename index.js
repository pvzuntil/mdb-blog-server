const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRoute = require('./route/authRoute')
const authMiddleware = require('./authMiddleware')
const makeRes = require('./lib/response')

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

app.get('/jajal', authMiddleware, (req, res)=>{
    return res.status(200).send(makeRes(1, 'Berhasil akses'))
})

app.listen(3000, () => {
    console.log('Runing !');
})