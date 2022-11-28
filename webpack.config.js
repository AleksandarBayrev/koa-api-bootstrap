const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: [
        path.resolve(__dirname, './build/index.js')
    ],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [],
    module: {
        rules: [],
    },
};
