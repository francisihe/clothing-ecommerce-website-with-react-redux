import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { UserProvider } from './contexts/user.provider'
//import { CategoriesProvider } from './contexts/categories.provider'
import { CartProvider } from './contexts/cart.provider'

import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
