const path = require('path')

module.exports = {
  entry: ['view/polyfill.js', 'view/index.js'],
  html: {
    template: path.resolve('public', 'index.html'),
  },
  staticFolder: 'public',
  presets: [
    require('poi-preset-bundle-report')(),
    require('./config/poi-preset-dev-sourcemap')('cheap-module-source-map'),
    require('./config/poi-preset-prod-publicPath')(''),
  ],
  clear: false,
  babel: require('./config/loadBabelrc')({
    cacheDirectory: true,
    babelrc: false,
  }),
}
