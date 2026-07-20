import { useState, useRef, useEffect } from 'react'

const COLUMN_ORDER = ['todo', 'inprogress', 'done']
const COLUMN_LABELS = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' }

export default function TaskCard({ task, onDelete, onMove, onEdit, onDragStart }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const commitEdit = () => {
    const trimmed = draftText.trim()
    if (trimmed.length > 0) {
      onEdit(task.id, trimmed)
    } else {
      setDraftText(task.text)
    }
    setIsEditing(false)
  }

  const currentIndex = COLUMN_ORDER.indexOf(task.column)
  const nextColumn = COLUMN_ORDER[currentIndex + 1]
  const prevColumn = COLUMN_ORDER[currentIndex - 1]

  return (
    <div
      className={`task-card priority-${task.priority}`}
      draggable={!isEditing}
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-card-top">
        <span className={`priority-chip priority-chip-${task.priority}`}>{task.priority}</span>
        <button className="icon-btn" title="Delete task" onClick={() => onDelete(task.id)}>
          ✕
        </button>
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          className="task-edit-input"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit()
            if (e.key === 'Escape') {
              setDraftText(task.text)
              setIsEditing(false)
            }
          }}
        />
      ) : (
        <p className="task-text" onClick={() => setIsEditing(true)} title="Click to edit">
          {task.text}
        </p>
      )}

      <div className="task-card-actions">
        {prevColumn && (
          <button className="move-btn" onClick={() => onMove(task.id, prevColumn)}>
            ← {COLUMN_LABELS[prevColumn]}
          </button>
        )}
        {nextColumn && (
          <button className="move-btn" onClick={() => onMove(task.id, nextColumn)}>
            {COLUMN_LABELS[nextColumn]} →
          </button>
        )}
      </div>
    </div>
  )
}
