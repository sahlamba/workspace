import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { GoArrowUp, GoTrashcan } from 'react-icons/go'

interface WorkspaceData {
  name: string
}

interface ListItemProps {
  ws: WorkspaceData
}

interface ListProps {
  workspaces: Array<WorkspaceData>
}

const data = [
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
]

const WorkspaceListItem = (props: ListItemProps) => {
  const { name } = props.ws
  return (
    <div className="workspace-select__list-item">
      <p className="workspace-select__list-item-name">{name}</p>
      <div className="workspace-select__list-item-actions">
        <GoArrowUp className="workspace-select__list-item-actions-icon" />
        <GoTrashcan className="workspace-select__list-item-actions-icon" />
      </div>
    </div>
  )
}

const WorkspaceListContainer = (props: ListProps) => {
  const { workspaces } = props
  return (
    <div className="workspace-select__list">
      {workspaces && workspaces.map(ws => <WorkspaceListItem ws={ws} />)}
    </div>
  )
}

export const WorkspaceSelector = () => {
  const [showList, setShowList] = useState(false)

  const onClick = () => setShowList(!showList)

  return (
    <div className="workspace-select">
      <div className="workspace-select__main" onClick={onClick}>
        <p className="workspace-select__main-name">workspace</p>
        <IoIosArrowDown
          className={`workspace-select__main-toggle ${
            showList ? 'rotate180' : ''
          }`}
        />
      </div>
      {showList && <WorkspaceListContainer workspaces={data} />}
    </div>
  )
}
