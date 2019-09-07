import 'draft-js/dist/Draft.css'
import './css/App.scss'

import React, { useEffect } from 'react'
import { Header } from './components/Header'
import { NoteEditor } from './components/NoteEditor'
import { WorkspaceContextProvider } from './context/WorkspaceContext'
import { DarkModeContextProvider } from './context/DarkModeContext'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-147259310-1')

export const App = () => {
  useEffect(() => {
    ReactGA.pageview('/')
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
