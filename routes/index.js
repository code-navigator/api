const express = require('express'),
  router = express.Router()

router.use('/pohelper', require('./poHelper'))
router.use('/spechelper', require('./specHelper'))

module.exports = router