import { useState } from 'react'

export const useLocalStorage = (key, defaultValue) => {
  // Load persisted value if it exists
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      // eslint-disable-next-line
      console.error({ error })
      return defaultValue
    }
  })

  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      return true
    } catch (error) {
      // eslint-disable-next-line
      console.log({ error })
      return false
    }
  }

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      // eslint-disable-next-line
      console.error({ error })
      return false
    }
  }

  return [storedValue, setValue, clearValue]
}
