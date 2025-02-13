const awsServerlessExpress = require('aws-serverless-express')

const app = require('./app')

const server = awsServerlessExpress.createServer(app(process.env.LAMBDA_TASK_ROOT), null, [])

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context)