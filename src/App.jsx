import React, { lazy, Suspense } from 'react'
// import React from 'react'
// import Sidebar from './components/sidebar/Sidebar'
// import Main from './components/main/Main'
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'))
const Main = lazy(() => import('./components/main/Main'))

const AppShell = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }} />
)

const App = () => {
  return (
    <Suspense fallback={<AppShell />}>
      <Sidebar />
      <Main />
    </Suspense>
  )
}

export default App