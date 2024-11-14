const config = require('./webpack.config');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = [{
    ...config[0],
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: config[0].module.rules.map(rule => {
            const { test, use } = rule;
            return {
                test,
                use: use.filter(x => x.loader !== WebpackObfuscator.loader)
            }
        })
    }
}, {
    ...config[1],
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: config[1].module.rules.map(rule => {
            const { test, use } = rule;
            return {
                test,
                use: use.filter(x => x.loader !== WebpackObfuscator.loader)
            }
        })
    }
}];