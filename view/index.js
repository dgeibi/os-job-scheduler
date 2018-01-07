import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const render = Component => {
  let node
  if (process.env.NODE_ENV === 'production') {
    node = <Component />
  } else {
    const { AppContainer } = require('react-hot-loader')
    node = (
      <AppContainer>
        <Component />
      </AppContainer>
    )
  }
  ReactDOM.render(node, document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
