import React, { StrictMode, startTransition } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/Context.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

startTransition(() => {
  root.render(
    <ContextProvider>
      <App />
    </ContextProvider>
  )
})