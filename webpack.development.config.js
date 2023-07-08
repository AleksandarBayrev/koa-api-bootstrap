const config = require('./webpack.config');

module.exports = {
    ...config,
    mode: 'development',
    plugins: [],
    module: {
        rules: []
    }
};