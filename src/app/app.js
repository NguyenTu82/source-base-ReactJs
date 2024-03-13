import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from '../store'
import Theme from '../theme'
import Init from './init'
import Routes from './routes'

import '../resources/styles'

const App = () => (
  <Provider store={store}>
    <Theme>
      <Init />
      <Routes />
    </Theme>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('application'))
