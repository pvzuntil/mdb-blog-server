const router = require('express').Router()
const makeRes = require('../lib/response');
const UserModel = require('../model/User')
const validation = require('../model/validation')

router.post('/register', async (req, res) => {
    let data = req.body

    let { error } = validation.registerValidation(data)
    if (error) return res.status(400).send(makeRes(0, 'Validasi gagal !', error.details[0]))

    const user = UserModel({
        name: data.name,
        email: data.email,
        password: data.password
    })

    try {
        let saveUser = await user.save()
        return res.status(200).send(makeRes(1, 'Berhasil menambah user', saveUser))
    } catch (error) {
        return res.status(400).send(error)
    }

})

module.exports = router