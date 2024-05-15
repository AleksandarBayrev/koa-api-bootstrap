const config = require('./webpack.config');

module.exports = [{
    ...config[0],
    devtool: 'source-map',
    mode: 'development',
    plugins: [],
    module: {
        rules: []
    }
}, {
    ...config[1],
    devtool: 'source-map',
    mode: 'development',
    plugins: [],
    module: {
        rules: []
    }
}];