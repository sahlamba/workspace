import 'draft-js/dist/Draft.css'
import './css/App.scss'

import React, { useEffect } from 'react'
import { Header } from './components/Header'
import { NoteEditor } from './components/NoteEditor'
import { WorkspaceContextProvider } from './context/WorkspaceContext'
import { DarkModeContextProvider } from './context/DarkModeContext'
import { initAnalytics, trackPage } from './utils/tracking.js'

export const App = () => {
  useEffect(() => {
    initAnalytics()
    trackPage({ path: '/' })
  }, [])

  return (
    <DarkModeContextProvider>
      <WorkspaceContextProvider>
        <div className="app">
          <Header />
          <NoteEditor />
        </div>
      </WorkspaceContextProvider>
    </DarkModeContextProvider>
  )
}
