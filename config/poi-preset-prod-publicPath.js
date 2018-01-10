module.exports = x => poi => {
  poi.extendWebpack('production', config => {
    config.output.publicPath(x)
  })
}
