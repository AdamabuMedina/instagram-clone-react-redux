const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   context: path.resolve(__dirname, "src"),
   entry: "./index.js",
   output: {
      filename: "build.js",
      path: path.resolve(__dirname, "build")
   },
   resolve: {
      extensions: ['.js', '.json', '.png', "jsx"],
      alias: {
         '@models': path.resolve(__dirname, 'src/models'),
         '@': path.resolve(__dirname, 'src'),
      }
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(),
   ],
   module: {
      rules: [
         {
            test: /\.m?js$/,
            use: {
               loader: 'babel-loader',
               options:
               {
                  presets:
                     ['@babel/preset-env', '@babel/react',
                        { 'plugins': ['@babel/plugin-proposal-class-properties'] }
                     ]
               }
            }
         },
      ],
   }
}
