import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

export const NoteEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  let editorRef
  const setEditor = editor => {
    editorRef = editor
  }
  const focusEditor = () => {
    if (editorRef) {
      editorRef.focus()
    }
  }
  const onChange = value => setEditorState(value)

  useEffect(() => {
    focusEditor()
  }, [])

  return (
    <div className="note-editor__container" onClick={focusEditor}>
      <Editor
        ref={setEditor}
        placeholder="What are you thinking about?"
        editorState={editorState}
        onChange={onChange}
      />
    </div>
  )
}
