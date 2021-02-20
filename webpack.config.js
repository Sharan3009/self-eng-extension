const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        background: path.resolve(__dirname,"background.ts"),
        contentScript: path.resolve(__dirname,"contentScript.ts"),
        bootstrap: path.resolve(__dirname,"bootstrap.scss")
    },
    mode: "development",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    // the 'transform-runtime' plugin tells Babel to
    // require the runtime instead of inlining it.
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /(node_modules|bower_components)/,
            options: {
                presets: ['@babel/preset-env'],
            }
        },{
            loader: "ts-loader",
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /(node_modules|bower_components)/,
        },{
            test: /\.s[ac]ss$/i,
            use: [
                // fallback to style-loader in development
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ],
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
    ],
};