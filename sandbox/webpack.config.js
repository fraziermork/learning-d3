const webpack = require('webpack');

let PATHS = {
  entry: __dirname + '/entry.js',
  build: __dirname + '/build'
};

module.exports = {
  entry: PATHS.entry,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }, 
  devtool: 'eval', 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/, 
        loaders: ['babel'],
        include: __dirname + '/src'
      }, 
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, 
      {
        test: /\.html$/, 
        loaders: ['file']
      }
    ]
  }, 
  devServer: {
    devtool:            'eval-source-map',
    contentBase:        PATHS.build, 
    historyApiFallback: true,
    hot:                true,
    inline:             true,
    progress:           true,
    stats:              'errors-only'
  }
};
