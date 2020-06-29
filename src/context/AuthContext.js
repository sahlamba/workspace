import React, { createContext, useContext, useState, useEffect } from 'react'
import { firebase } from '../utils/firebase'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [phone, setPhone] = useState('')
  const [authenticating, setAuthenticating] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged(user => {
      // Used only on App startup while Firebase checks for persisted Auth state
      setAuthenticating(false)
      setIsLoggedIn(!!user)
      setPhone(!!user ? user.phoneNumber : '')
    })
    return () => {
      unregister()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authenticating, isLoggedIn, phone }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
