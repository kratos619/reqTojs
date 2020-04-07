const path = require('path');
// module.exports = {
//     mode: 'production', // "production" | "development" | "none"
//     entry: {
//         app: ['babel-polyfill',
//             "./src/app.js"
//         ]
//     },
//     output: {
//         path: path.resolve(__dirname, 'build'),
//         filename: "app.bundle.js"
//     },
//     module: {
//         rules: [{
//             test: /\.js?$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader',
//             query: {
//                 presets: [
//                     "@babel/preset-env",
//                     '@babel/stage-0'
//                 ]

//             }
//         }]
//     }
// }

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    entry: {
        app: ['babel-polyfill', './src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
        }]
    }
};