const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unsafe: true,
            inline: true,
            passes: 2,
            keep_fargs: false,
          },
          output: {
            beautify: false,
          },
          mangle: true,
        },
      })
    ],
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
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(woff(2)?)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'
    }),
    new CleanWebpackPlugin()
  ],
};