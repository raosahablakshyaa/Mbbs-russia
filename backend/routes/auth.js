const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { login, me, updateProfile, updatePassword } = require('../controllers/authController')

router.post('/login', login)
router.get('/me', auth, me)
router.put('/profile', auth, updateProfile)
router.put('/password', auth, updatePassword)

module.exports = router
