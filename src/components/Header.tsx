import React from 'react'
import { IoIosMoon } from 'react-icons/io'
import { useDarkModeContext } from '../context/DarkModeContext'
import { WorkspaceSelector } from '../components/WorkspaceSelector'

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkModeContext()

  return (
    <div className={`app-header ${darkMode ? 'dark-mode' : ''}`}>
      <WorkspaceSelector />
      <IoIosMoon
        className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}
        onClick={() => toggleDarkMode()}
      />
    </div>
  )
}
