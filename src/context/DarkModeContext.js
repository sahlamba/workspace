import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const DarkModeContext = createContext(null)

export const DarkModeContextProvider = ({ children }) => {
  const [storedValue, setValue] = useLocalStorage('darkMode', false)
  const [darkMode, setDarkMode] = useState(storedValue ? storedValue : false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Ideally, useEffect should be in useLocalStorage to automatically
  // listen to state changes of the item that needs to be persisted
  useEffect(() => {
    setValue(darkMode)
  }, [darkMode, setValue])

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkModeContext = () => useContext(DarkModeContext)
