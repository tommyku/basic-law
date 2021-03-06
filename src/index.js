import 'react-app-polyfill/ie11';
import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'

import App from './App'
import { ResponsiveProvider } from './ResponsiveContext'
import registerServiceWorker from './registerServiceWorker'
import './index.scss'

ReactDOM.render(
  <ResponsiveProvider>
    <App />
  </ResponsiveProvider>,
  document.getElementById('root')
)
registerServiceWorker()
