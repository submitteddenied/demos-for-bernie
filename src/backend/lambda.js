import awsServerlessExpress  from 'aws-serverless-express'

import app from './app'

const server = awsServerlessExpress.createServer(app(process.env.LAMBDA_TASK_ROOT), null, [])

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context)