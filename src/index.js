import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Routes from './routes/Routes'
import axios from 'axios'
import { AuthProvider } from './store/AuthContext'
import { Provider } from 'react-redux'
import { store } from './store/ReduxStore'
import { NavigationProvider } from './store/NavigationContext'
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <NavigationProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </NavigationProvider>
  </AuthProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
