const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const c = require('../controllers/contactController')

router.post('/', c.submit)
router.get('/', auth, c.getAll)
router.patch('/:id/replied', auth, c.markReplied)
router.delete('/:id', auth, c.delete)

module.exports = router
