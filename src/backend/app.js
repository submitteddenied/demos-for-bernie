const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      fs = require('fs')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = (rootPath) => {
  var app = express()

  // Normal express config defaults
  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  let firebase
  if(isProduction) {
    const firebaseAdmin = require('firebase-admin')
    const rawCreds = fs.readFileSync(path.resolve(rootPath, process.env.CRED_FILE))
    const creds = JSON.parse(rawCreds)
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(creds)
    })
    firebase = firebaseAdmin.firestore()
  } else {
    const MockFirebase = require('./mock-firebase')
    firebase = new MockFirebase()
  }
  const routes = require('./routes')

  app.use(routes(firebase))

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  /// error handlers

  // development error handler
  // will print stacktrace
  if (!isProduction) {
    app.use(function(err, req, res, next) {
      console.log(err.stack)

      res.status(err.status || 500)

      res.json({'errors': {
        message: err.message,
        error: err
      }})
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({'errors': {
      message: err.message,
      error: {}
    }})
  })

  return app
}
