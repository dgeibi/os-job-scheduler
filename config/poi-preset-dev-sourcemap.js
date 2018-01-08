module.exports = x => poi => {
  poi.extendWebpack('development', config => {
    config.devtool(x)
  })
}
