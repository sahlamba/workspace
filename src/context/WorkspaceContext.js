import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { workspaceReducer, defaultState } from '../reducers/WorkspaceReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const WorkspaceContext = createContext(null)

export const WorkspaceContextProvider = ({ children }) => {
  // useWorkspace here -
  // inside useWorkspace - use useReducer for state management
  // and expose interface methods like select/add/deleteWorkSpace (use dispatch
  // internally) instead of dispatch
  //
  // also - use useLocalStorage to persist - this will be generic custom hook
  //
  // can move below logic into custom hook now - useWorkspace
  const [storedValue, setValue] = useLocalStorage(
    'workspaceContext',
    defaultState,
  )
  const [state, dispatch] = useReducer(
    workspaceReducer,
    storedValue ? storedValue : defaultState,
  )

  useEffect(() => {
    setValue(state)
  }, [state, setValue])

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

// For Consumers to use Context to react to state changes
export const useWorkspaceContext = () => useContext(WorkspaceContext)
