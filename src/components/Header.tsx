import React from 'react'
import { IoIosMoon } from 'react-icons/io'
import { useDarkModeContext } from '../context/DarkModeContext'
import { WorkspaceSelector } from '../components/WorkspaceSelector'
import { UserAccount } from './UserAccount'

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkModeContext()

  return (
    <div className={`app-header ${darkMode ? 'dark-mode' : ''}`}>
      <WorkspaceSelector />
      <div className="app-header__actions">
        <IoIosMoon
          className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}
          onClick={() => toggleDarkMode()}
        />
        <UserAccount darkMode={darkMode} />
      </div>
    </div>
  )
}
