import React, { createContext, useContext, useState, useEffect } from 'react'
import { firebase } from '../utils/firebase'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [phone, setPhone] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // TODO: use a custom authUser() async/await method here and
    // use a loadingAuth state to render loading message before
    // <App /> render
    const unregister = firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user)
      setPhone(!!user ? user.phoneNumber : '')
    })
    return () => {
      unregister()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, phone }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
