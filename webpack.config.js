const path = require('path');

module.exports = {
    entry: {
        background: path.resolve(__dirname,"public/background.js"),
    },
    mode: "development",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    // the 'transform-runtime' plugin tells Babel to
    // require the runtime instead of inlining it.
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            options: {
                presets: ['@babel/preset-env'],
            }
        }]
    }
};