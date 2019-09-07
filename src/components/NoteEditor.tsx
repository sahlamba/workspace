import React, { useState, useEffect } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import { useWorkspaceContext } from '../context/WorkspaceContext'
import { useDarkModeContext } from '../context/DarkModeContext'
import { UPDATE_NOTE_TEXT } from '../reducers/WorkspaceReducer'

const DELIMITER = '\n'

const buildEditorState = state => {
  const { selectedWorkspace, workspaces } = state
  if (workspaces && workspaces.length) {
    const currentWorkspace = workspaces.filter(
      ws => ws.name === selectedWorkspace,
    )[0]
    return currentWorkspace.note && currentWorkspace.note.text
      ? EditorState.createWithContent(
          ContentState.createFromText(currentWorkspace.note.text, DELIMITER),
        )
      : EditorState.createEmpty()
  }
  return EditorState.createEmpty()
}

export const NoteEditor = () => {
  const { darkMode } = useDarkModeContext()

  const { state, dispatch } = useWorkspaceContext()
  const { selectedWorkspace } = state

  const [editorState, setEditorState] = useState(() => buildEditorState(state))

  let editorRef
  const setEditor = editor => {
    editorRef = editor
  }
  const focusEditor = () => {
    if (editorRef) {
      editorRef.focus()
    }
  }

  const onChange = value => {
    setEditorState(value)
    dispatch({
      type: UPDATE_NOTE_TEXT,
      text: value.getCurrentContent().getPlainText(DELIMITER),
    })
  }

  useEffect(() => {
    focusEditor()
  }, [])

  useEffect(() => {
    const editorState = buildEditorState(state)
    setEditorState(editorState)
  }, [selectedWorkspace])

  return (
    <div className={`note-editor ${darkMode ? 'dark-mode' : ''}`}>
      <div className="note-editor__container" onClick={focusEditor}>
        <Editor
          ref={setEditor}
          placeholder="This is your space. Start typing."
          editorState={editorState}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
