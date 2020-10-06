const router = require('express').Router()
const makeRes = require('../lib/response');
const UserModel = require('../model/User')
const validation = require('../model/validation')
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    let data = req.body

    let { error } = validation.registerValidation(data)
    if (error) return res.status(400).send(makeRes(0, 'Validasi gagal !', error.details[0]))

    const checkEmail = await UserModel.findOne({ email: data.email })
    if (checkEmail) return res.status(400).send(makeRes(0, 'Email sudah ada pak !'))

    let passSalt = await bycrypt.genSalt(10)
    let passHash = await bycrypt.hash(data.password, passSalt)

    const user = UserModel({
        name: data.name,
        email: data.email,
        password: passHash
    })

    try {
        let saveUser = await user.save()
        return res.status(200).send(makeRes(1, 'Berhasil menambah user', saveUser))
    } catch (error) {
        return res.status(400).send(error)
    }

})

router.post('/login', async (req, res) => {
    let data = req.body

    let { error } = validation.loginValidation(data)
    if (error) return res.status(400).send(makeRes(0, 'Validasi gagal', error.details[0]))

    let getUser = await UserModel.findOne({ email: data.email })
    if (!getUser) return res.status(400).send(makeRes(0, 'Email tidak ditemukan !'))

    let checkPass = await bycrypt.compare(data.password, getUser.password)
    if (!checkPass) return res.status(400).send(makeRes(0, 'Password salah !'))

    let token = jwt.sign({
        id: getUser._id
    }, process.env.JWT_KEY)

    return res.status(200).send(makeRes(1, 'Berhasil login', {token}))
})

module.exports = router