import 'draft-js/dist/Draft.css'
import './css/App.scss'

import React from 'react'
import { Header } from './components/Header'
import { NoteEditor } from './components/NoteEditor'
import { WorkspaceContextProvider } from './context/WorkspaceContext'
import { DarkModeContextProvider } from './context/DarkModeContext'

export const App = () => {
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
