const path = require('path')

module.exports = {
  entry: 'view/index.js',
  html: {
    template: path.resolve('public', 'index.html'),
  },
  staticFolder: 'public',
  presets: [
    require('poi-preset-react')(),
    require('poi-preset-bundle-report')(),
    require('./config/poi-preset/dev-sourcemap')('cheap-module-source-map'),
  ],
}
