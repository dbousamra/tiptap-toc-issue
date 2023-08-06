import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TableOfContent } from '@tiptap-pro/extension-table-of-content'
import { ToC } from './ToC'
import { content } from './content'

const MemorizedToC = React.memo(ToC)

import './App.css'

const App = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TableOfContent,
    ],
    content,
  })

  if (!editor) {
    return null
  }

  return (

    <div style={{
      backgroundColor: "#F7FAFC",
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "start"
    }}>
      <div className="table-of-content">
        <MemorizedToC editor={editor} items={editor.storage.tableOfContent.content} />
      </div>
      <div style={{
        display: "flex",
        width: "720px",
        height: "720px",
        padding: "32px",
        margin: "32px",
        backgroundColor: "white",
        overflowY: "auto"
      }}>
        <EditorContent editor={editor} />
      </div>

    </div>
  )
}

export default App
