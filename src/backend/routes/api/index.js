var router = require('express').Router()
let count = 0

router.get('/count', (req, res) => {
  return res.json({count})
})

router.post('/increment', (req, res) => {
  count++
  return res.json({success: true, count})
})

router.put('/count', (req, res) => {
  count = req.body.count
  return res.json({success: true, count})
})

module.exports = router
