import React from 'react'
import './css/App.scss'
import { Header } from './components/Header'
import { WorkspaceContextProvider } from './context/WorkspaceContext'

export const App = () => {
  return (
    <WorkspaceContextProvider>
      <div className="app">
        <Header />
      </div>
    </WorkspaceContextProvider>
  )
}
