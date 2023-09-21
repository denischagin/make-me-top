const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@features': path.resolve(__dirname, './src/features'),
        },
    },
};
