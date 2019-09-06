import React, { createContext, useReducer, useContext } from 'react'
import { workspaceReducer, workspaceState } from '../reducers/WorkspaceReducer'

export const WorkspaceContext = createContext(null)

export const WorkspaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workspaceReducer, workspaceState)
  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspaceValue = () => useContext(WorkspaceContext)
