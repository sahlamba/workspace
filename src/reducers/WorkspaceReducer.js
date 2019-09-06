export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE'

export const workspaceState = {
  selectedWorkspace: 'workspace',
  workspaces: [
    {
      name: 'workspace',
    },
    {
      name: 'A big line of text talking about something.',
    },
    {
      name: 'Thoughts',
    },
    {
      name: 'Work',
    },
    {
      name: 'Quotes',
    },
    {
      name: 'More',
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
    case DELETE_WORKSPACE:
      const { workspaces } = state
      return {
        ...state,
        workspaces: workspaces.filter(ws => ws.name !== action.name),
      }
    default:
      return state
  }
}
