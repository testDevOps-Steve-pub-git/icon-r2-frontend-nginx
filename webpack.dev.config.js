module.exports = {
    watch: true,
    entry: './src/app.js',
    output: {
        path: './src/',
        filename: 'app.bundle.js'
    },
    devtool: '#source-map'
};
