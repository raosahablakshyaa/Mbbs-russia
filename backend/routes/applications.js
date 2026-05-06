const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const c = require('../controllers/applicationController')

router.post('/', c.submit)
router.get('/', auth, c.getAll)
router.patch('/:id/status', auth, c.updateStatus)
router.delete('/:id', auth, c.delete)

module.exports = router
