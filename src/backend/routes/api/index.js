var router = require('express').Router()
const FieldValue = require('firebase-admin').firestore.FieldValue
module.exports = (firebase) => {
  let doc = firebase.doc('demos/submitteddenied')

  // TODO Error handling
  router.get('/count', (req, res) => {
    return doc.get().then((document) => {
      return res.json({count: document.get('demos')})
    })
  })

  router.post('/increment', (req, res) => {
    return doc.update('demos', FieldValue.increment(1))
      .then(() => {
        return doc.get()
      })
      .then((document) => {
        res.json({success:true, count: document.demos})
      })
  })

  router.put('/count', (req, res) => {
    doc.set({demos: req.body.count}, {merge: true})
      .then(() => doc.get())
      .then((document) => {
        res.json({success:true, count: document.demos})
      })
  })

  return router
}
