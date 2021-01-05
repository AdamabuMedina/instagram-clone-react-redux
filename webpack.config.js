const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        loader: ["style-loader", 'css-loader']
      },
      {
        test: /\.(woff(2)?)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[contenthash].[ext]'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      scriptLoading: 'defer',
      title: 'Caching',
    })],
};