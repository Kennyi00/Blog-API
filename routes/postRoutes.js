const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.post('/create', postController.create)
router.put('/:id', postController.update)
router.delete('/:id', postController.destroy)


module.exports = router