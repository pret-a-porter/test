var webpack = require('webpack');
var path = require('path');

var __dirname = '.';

module.exports = {
  entry: [
    './src/app.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]--[local]',
          'sass?sourceMap'
        ],
        exclude: /node_modules|lib/
      },
    ]
  },
  resolve: {
      root: path.resolve(__dirname + '/src'),
      modulesDirectories: [
          path.resolve(__dirname + '/src'),
          'node_modules',
      ],
      extensions: ['', '.js', '.jsx', '.scss']
    },  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',
    hot: false,
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
