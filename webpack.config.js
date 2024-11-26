// webpack.config.js
const webpack = require('webpack');

module.exports = {
    resolve: {
        fallback: {
            "assert": require.resolve("assert"),
            "buffer": require.resolve("buffer/"),
            "process": require.resolve("process/browser"),
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "vm": require.resolve("vm-browserify"),
            "url": require.resolve("url/"),
            "zlib": require.resolve("browserify-zlib"),
            "fs": false, // Si no necesitas fs, puedes usar false
            "path": require.resolve("path-browserify"),
            "querystring": false,
            "crypto": false,
            "async_hooks": false, // Si no lo necesitas, puedes usar false
            "net": false, 
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};