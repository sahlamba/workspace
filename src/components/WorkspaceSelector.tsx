import React, { useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosAdd, IoIosShuffle } from 'react-icons/io'
import { GoTrashcan } from 'react-icons/go'
import { useWorkspaceContext } from '../context/WorkspaceContext'
import { useDarkModeContext } from '../context/DarkModeContext'
import {
  ADD_WORKSPACE,
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

const AddWorkspaceListItem = () => {
  const [hideInput, setHideInput] = useState(true)
  const [showError, setShowError] = useState(false)
  const [name, setName] = useState('')

  const { darkMode } = useDarkModeContext()
  const { dispatch } = useWorkspaceContext()

  const addWorkspace = () => {
    // First click on `+` icon opens hidden text input
    if (hideInput) {
      setHideInput(false)
      return
    }
    if (name && name.length > 0 && name.length <= 20) {
      dispatch({ type: ADD_WORKSPACE, ws: { name } })
      setName('')
      setShowError(false)
      return
    }
  }

  let inputRef
  const setInputRef = input => {
    inputRef = input
  }
  const focusInput = () => {
    if (inputRef && !hideInput) {
      inputRef.focus()
    }
  }

  useEffect(() => {
    focusInput()
  })

  useEffect(() => {
    if (name && (name.length < 0 || name.length > 20)) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [name])

  return (
    <div
      className={`workspace-select__list-item ${darkMode ? 'dark-mode' : ''}`}>
      <div className="workspace-select__list-item-inner">
        <input
          ref={setInputRef}
          className={`workspace-select__text-input ${
            hideInput ? 'invisible' : 'visible'
          } ${showError ? 'workspace-select__text-input-error' : ''} ${
            darkMode ? 'dark-mode' : ''
          }`}
          placeholder="Give your workspace a name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="workspace-select__list-item-actions">
          <IoIosAdd
            className={`workspace-select__list-item-actions-icon ${
              darkMode ? 'dark-mode' : ''
            }`}
            onClick={() => addWorkspace()}
          />
          <p
            className={`workspace-select__list-item-actions-new ${
              hideInput ? 'visible' : 'invisible'
            }`}>
            New workspace
          </p>
        </div>
      </div>
      {/* {showError ? (
        <p className="text-input-error">Use 20 or less characters.</p>
      ) : null} */}
    </div>
  )
}

const WorkspaceListItem = (props: ListItemProps) => {
  const { darkMode } = useDarkModeContext()
  const { dispatch } = useWorkspaceContext()
  const { ws, actions } = props
  const { name } = ws

  const selectWorkspace = name => dispatch({ type: SELECT_WORKSPACE, name })
  const deleteWorkspace = name => dispatch({ type: DELETE_WORKSPACE, name })

  return (
    <div
      className={`workspace-select__list-item ${darkMode ? 'dark-mode' : ''}`}>
      <div className="workspace-select__list-item-inner">
        <p className="workspace-select__list-item-name">{name}</p>
        {actions ? (
          <div className="workspace-select__list-item-actions">
            <IoIosShuffle
              className={`workspace-select__list-item-actions-icon rotate-90 ${
                darkMode ? 'dark-mode' : ''
              }`}
              onClick={() => selectWorkspace(name)}
            />
            <GoTrashcan
              className={`workspace-select__list-item-actions-icon ${
                darkMode ? 'dark-mode' : ''
              }`}
              onClick={() => deleteWorkspace(name)}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

WorkspaceListItem.defaultProps = {
  actions: true,
}

const WorkspaceListContainer = (props: ListProps) => {
  const { workspaces } = props
  const { darkMode } = useDarkModeContext()

  return (
    <div className={`workspace-select__list ${darkMode ? 'dark-mode' : ''}`}>
      {workspaces && workspaces.length
        ? workspaces.map(ws => <WorkspaceListItem key={ws.name} ws={ws} />)
        : null}
      <AddWorkspaceListItem />
    </div>
  )
}

export const WorkspaceSelector = () => {
  const [showList, setShowList] = useState(false)

  const { darkMode } = useDarkModeContext()
  const { state } = useWorkspaceContext()
  const { selectedWorkspace, workspaces } = state

  const onClick = () => setShowList(!showList)

  return (
    <div className="workspace-select">
      <div
        className={`workspace-select__main ${darkMode ? 'dark-mode' : ''}`}
        onClick={onClick}>
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
