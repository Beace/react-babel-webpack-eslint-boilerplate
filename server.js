/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// set middleware config
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
});

const fs = middleware.fileSystem;

// config the dev hotload middleware
if (process.env.NODE_ENV === 'development') {
  app.use(middleware);
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
}

// Why use fs from middleware ？
// You need match outputPath for a server router
// If just use sendFile function, the route did not match as your wish
app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(3000, err => {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
