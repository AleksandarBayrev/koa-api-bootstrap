const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

const configs = [{
    mode: 'production',
    target: 'node',
    entry: [
        path.resolve(__dirname, './build/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        new WebpackObfuscator({
            compact: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            identifierNamesGenerator: 'hexadecimal',
            selfDefending: true,
            splitStrings: true,
            splitStringsChunkLength: 2,
            stringArrayEncoding: ['rc4'],
            target: 'node',
            unicodeEscapeSequence: true
        }),
    ],
    module: {
        rules: [],
    },
}, {
    mode: 'production',
    target: 'node',
    entry: [
        path.resolve(__dirname, './build/workers/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worker.js'
    },
    plugins: [
        new WebpackObfuscator({
            compact: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            identifierNamesGenerator: 'hexadecimal',
            selfDefending: true,
            splitStrings: true,
            splitStringsChunkLength: 2,
            stringArrayEncoding: ['rc4'],
            target: 'node',
            unicodeEscapeSequence: true
        }),
    ],
    module: {
        rules: [],
    },
}];

module.exports = configs;