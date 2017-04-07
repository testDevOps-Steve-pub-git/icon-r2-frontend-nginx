var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist/',
        filename: 'app.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: true,
            mangle: true,
            comments: false,
            sourceMap: true
        }),
        new webpack.optimize.DedupePlugin(),
        new CopyWebpackPlugin([
            { from: './src/index.html',     to: '../dist/index.html' },

            { from: './src/css',            to: '../dist/css' },
            { from: './src/fonts',          to: '../dist/fonts' },
            { from: './src/img',            to: '../dist/img' },
            { from: './src/lib',            to: '../dist/lib' },
            { from: './src/multitenancy',   to: '../dist/multitenancy' },
            { from: './src/phu',            to: '../dist/phu' },

            { context: './src/',    from: '**/*.template.html',     to: '../dist/' },
            { context: './src/',    from: '**/*.json',              to: '../dist/' },

            { from: './nginx.conf',  to: '../dist/nginx.conf' }
        ])
    ]
};
