const router = require('express').Router()
const makeRes = require('../lib/response');
const UserModel = require('../model/User')
const validation = require('../model/validation')
const bycrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    let data = req.body

    let { error } = validation.registerValidation(data)
    if (error) return res.status(400).send(makeRes(0, 'Validasi gagal !', error.details[0]))

    const checkEmail = await UserModel.findOne({email: data.email})
    if(checkEmail) return res.status(400).send(makeRes(0, 'Email sudah ada pak !'))

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

module.exports = router