import { trackEvent } from '../utils/tracking'

export const ADD_WORKSPACE = 'ADD_WORKSPACE'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE'
export const UPDATE_NOTE_TEXT = 'UPDATE_NOTE_TEXT'

const defaultWorkspaceData = {
  name: '',
  note: {
    text: '',
  },
}

export const defaultState = {
  selectedWorkspace: 'workspace',
  workspaces: [
    {
      name: 'workspace',
      note: {
        text: '',
      },
    },
  ],
}

export const workspaceReducer = (state, action) => {
  switch (action.type) {
    case SELECT_WORKSPACE: {
      trackEvent({
        category: 'Workspace',
        action: 'Switch',
      })
      return {
        ...state,
        selectedWorkspace: action.name,
      }
    }
    case DELETE_WORKSPACE: {
      trackEvent({
        category: 'Workspace',
        action: 'Delete',
      })
      const { workspaces } = state
      return {
        ...state,
        workspaces: workspaces.filter(ws => ws.name !== action.name),
      }
    }
    case ADD_WORKSPACE: {
      trackEvent({
        category: 'Workspace',
        action: 'Add',
      })
      const { workspaces } = state
      workspaces.push({ ...defaultWorkspaceData, ...action.ws })
      return {
        ...state,
        workspaces,
      }
    }
    case UPDATE_NOTE_TEXT: {
      const { selectedWorkspace, workspaces } = state
      const currentWorkspace = workspaces.filter(
        ws => ws.name === selectedWorkspace,
      )[0]
      const restWorkspaces = workspaces.filter(
        ws => ws.name !== selectedWorkspace,
      )
      currentWorkspace.note.text = action.text
      return {
        ...state,
        workspaces: [...restWorkspaces, currentWorkspace],
      }
    }
    default:
      return state
  }
}
