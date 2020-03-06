const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const OUTPUT_DIR = path.resolve(__dirname, "dist", "frontend")
const frontend = {
  entry: {
    app: path.resolve("src/frontend/index.js"),
    admin: path.resolve("src/frontend/admin.js")
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        }
      }
    ]
  },
  devServer: {
    contentBase: OUTPUT_DIR,
    publicPath: '/',
    watchContentBase: true,
    liveReload: true,
    after: (app, server, compiler) => {
      app.use(require('./src/backend/app')(__dirname))
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/index.html"),
      filename: path.resolve(OUTPUT_DIR, "./index.html"),
      chunks: ['app']
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/frontend/admin.html"),
      filename: path.resolve(OUTPUT_DIR, "./admin.html"),
      chunks: ['admin']
    })
    // To add more HTML entry points, add more HtmlWebPackPlugin instances to this list
  ]
}

const backend = {
  entry: path.resolve("src/backend/dev.js"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist", "backend"),
    publicPath: ''
  },
  externals: {
    protobufjs: 'commonjs2 protobufjs'
  }
}

module.exports = (env, argv) => {
  if(argv.mode === 'production') {
    backend.entry = path.resolve("src/backend/lambda.js")
  }
  return [frontend, backend]
}
