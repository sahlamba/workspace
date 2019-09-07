import React from 'react'
import './css/App.scss'
import { Header } from './components/Header'
import { WorkspaceContextProvider } from './context/WorkspaceContext'
import { DarkModeContextProvider } from './context/DarkModeContext'

export const App = () => {
  return (
    <DarkModeContextProvider>
      <WorkspaceContextProvider>
        <div className="app">
          <Header />
        </div>
      </WorkspaceContextProvider>
    </DarkModeContextProvider>
  )
}
