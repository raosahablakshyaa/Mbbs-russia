const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const c = require('../controllers/blogController')

router.get('/', c.getAll)
router.get('/:slug', c.getOne)
router.post('/', auth, c.create)
router.put('/:id', auth, c.update)
router.delete('/:id', auth, c.delete)

module.exports = router
