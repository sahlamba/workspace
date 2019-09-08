import React, { useState } from 'react'
import { IoIosLogIn } from 'react-icons/io'

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
          className={`user-account__login-options ${
            darkMode ? 'dark-mode' : ''
          }`}>
          <div
            className={`user-account__login-options-item ${
              darkMode ? 'dark-mode' : ''
            }`}>
            <p>Login</p>
          </div>
        </div>
      )}
    </div>
  )
}

export const UserAccount = ({ darkMode }) => {
  return (
    <div className="user-account">
      <LoginAction darkMode={darkMode} />
    </div>
  )
}
