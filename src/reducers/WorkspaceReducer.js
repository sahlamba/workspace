export const ADD_WORKSPACE = 'ADD_WORKSPACE'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE'

export const defaultState = {
  selectedWorkspace: 'workspace',
  workspaces: [
    {
      name: 'workspace',
    },
  ],
}

export const workspaceReducer = (state, action) => {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return {
        ...state,
        selectedWorkspace: action.name,
      }
    case DELETE_WORKSPACE: {
      const { workspaces } = state
      return {
        ...state,
        workspaces: workspaces.filter(ws => ws.name !== action.name),
      }
    }
    case ADD_WORKSPACE: {
      const { workspaces } = state
      workspaces.push(action.ws)
      return {
        ...state,
        workspaces,
      }
    }
    default:
      return state
  }
}
