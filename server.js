/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      silent: true,
      stats: 'errors-only',
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, err => {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
