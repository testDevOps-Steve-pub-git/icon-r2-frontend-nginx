const path    = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',

    output: {
        path:     path.resolve(__dirname, 'src'),
        filename: 'app.bundle.js'
    },

    module: {
      loaders: [
        {
          test:     /\.js$/,
          exclude:  /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [ 'es2015' ],
                plugins: [ 'transform-object-rest-spread' ],
              }
            },
          ],
        }
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({ options: { disableHostCheck: true } }),
    ],

    devtool: '#source-map',
};
