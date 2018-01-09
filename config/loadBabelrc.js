const { findBabelrc } = require('@babel/core/lib/config/files/configuration')

module.exports = (extraOpts, cwd = process.cwd()) => {
  const { options, filepath } = findBabelrc(`${cwd}/index.js`, 'development')
  if (!options) {
    throw Error('babelrc not found')
  }
  // eslint-disable-next-line
  console.log('> Using babelrc', `"${filepath}"`)
  return Object.assign(options, extraOpts)
}
