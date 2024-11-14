const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const os = require('os');
const threadLoader = require('thread-loader');
threadLoader.warmup({
    workers: os.cpus().length - 2
},
    [
        'ts-loader',
        'webpack-obfuscator'
    ]);

const resolve = Object.freeze({
    extensions: ['.ts', '.js'],
    alias: {
        '@app-root': path.join(__dirname, 'src'),
        '@app-root/*': path.join(__dirname, 'src'),
        '@app-base': path.join(__dirname, 'src', 'base'),
        '@app-base/*': path.join(__dirname, 'src', 'base'),
        '@app-handlers': path.join(__dirname, 'src', 'handlers'),
        '@app-handlers/*': path.join(__dirname, 'src', 'handlers'),
        '@app-server': path.join(__dirname, 'src', 'server'),
        '@app-server/*': path.join(__dirname, 'src', 'server'),
        '@app-services': path.join(__dirname, 'src', 'services'),
        '@app-services/*': path.join(__dirname, 'src', 'services'),
        '@app-types': path.join(__dirname, 'src', 'types'),
        '@app-types/*': path.join(__dirname, 'src', 'types'),
        '@app-workers': path.join(__dirname, 'src', 'workers'),
        '@app-workers/*': path.join(__dirname, 'src', 'workers'),
        '@app-constants': path.join(__dirname, 'src', 'constants'),
        '@app-helpers': path.join(__dirname, 'src', 'Helpers'),
    }
});

const configs = [{
    mode: 'production',
    target: 'node',
    entry: [
        path.resolve(__dirname, 'src', 'index.ts')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: os.cpus().length - 2
                        }
                    },
                    {
                        loader: WebpackObfuscator.loader,
                        options: {
                            compact: true,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            debugProtection: true,
                            identifierNamesGenerator: 'mangled',
                            selfDefending: true,
                            splitStrings: true,
                            splitStringsChunkLength: 2,
                            stringArray: true,
                            stringArrayEncoding: ['rc4'],
                            target: 'node',
                            unicodeEscapeSequence: true
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve
}, {
    mode: 'production',
    target: 'node',
    entry: [
        path.resolve(__dirname, 'src', 'workers', 'exampleWorker', 'exampleWorker.ts')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'exampleWorker.js'
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: os.cpus().length - 2
                        }
                    },
                    {
                        loader: WebpackObfuscator.loader,
                        options: {
                            compact: true,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            debugProtection: true,
                            identifierNamesGenerator: 'mangled',
                            selfDefending: true,
                            splitStrings: true,
                            splitStringsChunkLength: 2,
                            stringArray: true,
                            stringArrayEncoding: ['rc4'],
                            target: 'node',
                            unicodeEscapeSequence: true
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve
}];

module.exports = configs;