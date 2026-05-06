const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController')

router.post('/', auth, uploadMiddleware, uploadFile)

module.exports = router
