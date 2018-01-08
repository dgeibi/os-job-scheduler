const reactHot = md => App => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    const { hot } = require('react-hot-loader')
    App = hot(md)(App)
  }
  return App
}

export default reactHot
