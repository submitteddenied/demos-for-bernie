const router = require('express').Router()

module.exports = (firebase) => {
  router.use('/api', require('./api')(firebase))
  
  return router
}
