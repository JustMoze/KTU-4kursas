const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
module.exports = withImages();
// if (!options.isServer) {
//     config.resolve.alias['@sentry/node'] = '@sentry/browser'
//   }
module.exports = {
    experimental: { granularChunks: true },
    webpack: (config, options ) => {
        if (!options.isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        return config;
    }
};


//   webpack(config, options) {
//     // config.module.rules.push({
//     //     test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
//     //     use: [
//     //       {
//     //         loader: 'file-loader',
//     //       },
//     //     ],
//     // });
//     // return config;
//   }
