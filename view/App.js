import React, { Fragment } from 'react'
import { Provider } from 'redux-zero/react'

import store from './store'
import OptsForm from './OptsForm'
import View from './View'
import hot from './utils/hot'

const App = () => (
  <Provider store={store}>
    <Fragment>
      <OptsForm />
      <View />
    </Fragment>
  </Provider>
)

export default hot(module)(App)
