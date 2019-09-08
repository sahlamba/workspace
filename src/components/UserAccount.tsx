import React, { useState } from 'react'
import { IoIosLogIn, IoIosLogOut, IoIosSettings } from 'react-icons/io'
import { GoCheck, GoX } from 'react-icons/go'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuthContext } from '../context/AuthContext'
import { uiConfig, firebase, logout } from '../utils/firebase'

const LogoutAction = ({ darkMode }) => {
  const [confirmLogout, setConfirmLogout] = useState(false)

  const logoutOnClick = () => {
    logout()
  }

  const toggleConfirmLogout = () => setConfirmLogout(!confirmLogout)

  return (
    <div className="workspace-select__list-item-inner">
      <p>Logout</p>
      <div className="workspace-select__list-item-actions">
        {confirmLogout ? (
          <div className="workspace-select__list-item-actions-confirm">
            <GoCheck
              className={`workspace-select__list-item-actions-icon ${
                darkMode ? 'dark-mode' : ''
              } delete-action`}
              onClick={logoutOnClick}
            />
            <GoX
              className={`workspace-select__list-item-actions-icon ${
                darkMode ? 'dark-mode' : ''
              }`}
              onClick={() => toggleConfirmLogout()}
            />
          </div>
        ) : (
          <IoIosLogOut
            className={`workspace-select__list-item-actions-icon ${
              darkMode ? 'dark-mode' : ''
            }`}
            onClick={() => toggleConfirmLogout()}
          />
        )}
      </div>
    </div>
  )
}

const UserAccountOptions = ({ darkMode }) => {
  const [showOptions, setShowOptions] = useState(false)

  const onClick = () => setShowOptions(!showOptions)

  return (
    <div className="user-account__login">
      <IoIosSettings
        className={`user-account__login-toggle ${darkMode ? 'dark-mode' : ''} ${
          showOptions ? 'active' : ''
        }`}
        onClick={onClick}
      />
      {showOptions && (
        <div
          className={`user-account__login-options ${
            darkMode ? 'dark-mode' : ''
          }`}>
          <div
            className={`user-account__login-options-item ${
              darkMode ? 'dark-mode' : ''
            }`}>
            <LogoutAction darkMode={darkMode} />
          </div>
        </div>
      )}
    </div>
  )
}

const LoginAction = ({ darkMode }) => {
  const [showOptions, setShowOptions] = useState(false)

  const onClick = () => setShowOptions(!showOptions)

  return (
    <div className="user-account__login">
      <IoIosLogIn
        className={`user-account__login-toggle ${darkMode ? 'dark-mode' : ''} ${
          showOptions ? 'active' : ''
        }`}
        onClick={onClick}
      />
      {showOptions && (
        <div
          className={`user-account__login-options auto-width ${
            darkMode ? 'dark-mode' : ''
          }`}>
          <div
            className={`user-account__login-options-item zero-padding ${
              darkMode ? 'dark-mode' : ''
            }`}>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export const UserAccount = ({ darkMode }) => {
  const { isLoggedIn } = useAuthContext()

  return (
    <div className="user-account">
      {isLoggedIn ? (
        <UserAccountOptions darkMode={darkMode} />
      ) : (
        <LoginAction darkMode={darkMode} />
      )}
    </div>
  )
}
