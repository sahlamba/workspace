import React from 'react'
import { WorkspaceSelector } from '../components/WorkspaceSelector'

export const Header = () => {
  return (
    <div className="app-header">
      <WorkspaceSelector />
    </div>
  )
}
