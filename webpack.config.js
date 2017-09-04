const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'app'),
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
};
