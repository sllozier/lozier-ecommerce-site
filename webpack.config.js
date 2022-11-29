const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
    }),
    new Dotenv({
      path: './.env'
    }),
  ],
  performance:{
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
          ]},
    ],
  },
});