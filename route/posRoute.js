const router = require('express').Router()

router.get('/all', (req, res)=>{
    return res.status(200).send('all')
})


router.get('/single', (req, res)=>{
    return res.status(200).send('single')
})

module.exports = router