const { existsSync, readFileSync } = require('fs')

let options = null

if (existsSync('.babelrc')) {
  options = JSON.parse(readFileSync('.babelrc', { encoding: 'utf8' }))
} else if (existsSync(`.babelrc.js`)) {
  // eslint-disable-next-line import/no-dynamic-require
  options = require(`${process.cwd()}/.babelrc.js`)
}

if (options === null) {
  throw Error('.babelrc(.js) not found')
}

options.babelrc = false

module.exports = options
