import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { GoArrowUp, GoTrashcan } from 'react-icons/go'
import { useWorkspaceValue } from '../context/WorkspaceContext'
import {
  SELECT_WORKSPACE,
  DELETE_WORKSPACE,
} from '../reducers/WorkspaceReducer'

interface WorkspaceData {
  name: string
}

interface ListItemProps {
  ws: WorkspaceData
  actions?: boolean
}

interface ListProps {
  workspaces: Array<WorkspaceData>
}

const WorkspaceListItem = (props: ListItemProps) => {
  const { dispatch } = useWorkspaceValue()
  const { ws, actions } = props
  const { name } = ws

  const selectWorkspace = name => dispatch({ type: SELECT_WORKSPACE, name })
  const deleteWorkspace = name => dispatch({ type: DELETE_WORKSPACE, name })

  return (
    <div className="workspace-select__list-item">
      <p className="workspace-select__list-item-name">{name}</p>
      {actions ? (
        <div className="workspace-select__list-item-actions">
          <GoArrowUp
            className="workspace-select__list-item-actions-icon"
            onClick={() => selectWorkspace(name)}
          />
          <GoTrashcan
            className="workspace-select__list-item-actions-icon"
            onClick={() => deleteWorkspace(name)}
          />
        </div>
      ) : null}
    </div>
  )
}

WorkspaceListItem.defaultProps = {
  actions: true,
}

const WorkspaceListContainer = (props: ListProps) => {
  const { workspaces } = props
  return (
    <>
      {workspaces && workspaces.length ? (
        <div className="workspace-select__list">
          {workspaces.map(ws => (
            <WorkspaceListItem key={ws.name} ws={ws} />
          ))}
        </div>
      ) : (
        <div className="workspace-select__list">
          <WorkspaceListItem
            ws={{ name: 'No other workspaces.' }}
            actions={false}
          />
        </div>
      )}
    </>
  )
}

export const WorkspaceSelector = () => {
  const [showList, setShowList] = useState(false)

  const { state } = useWorkspaceValue()
  const { selectedWorkspace, workspaces } = state

  const onClick = () => setShowList(!showList)

  return (
    <div className="workspace-select">
      <div className="workspace-select__main" onClick={onClick}>
        <p className="workspace-select__main-name">{selectedWorkspace}</p>
        <IoIosArrowDown
          className={`workspace-select__main-toggle ${
            showList ? 'rotate180' : ''
          }`}
        />
      </div>
      {showList && (
        <WorkspaceListContainer
          workspaces={workspaces.filter(ws => ws.name !== selectedWorkspace)}
        />
      )}
    </div>
  )
}
