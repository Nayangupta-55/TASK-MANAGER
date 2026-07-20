import { useState } from 'react'

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setText('')
    setPriority('medium')
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Describe a new task…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add-task-input"
      />
      <div className="add-task-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`priority-select priority-select-${priority}`}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="add-task-btn">
          + Add Task
        </button>
      </div>
    </form>
  )
}
