import { useState, useEffect } from 'react'
import Column from './components/Column.jsx'

const STORAGE_KEY = 'kanban-board-state-v1'

const SEED_TASKS = [
  { id: 'seed-1', text: 'Set up Vite + React project', priority: 'high', column: 'done' },
  { id: 'seed-2', text: 'Build 3-column board layout', priority: 'medium', column: 'inprogress' },
  { id: 'seed-3', text: 'Wire up localStorage persistence', priority: 'low', column: 'todo' },
]

function loadInitialTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Could not read saved board, starting fresh.', err)
  }
  return SEED_TASKS
}

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export default function App() {
  const [tasks, setTasks] = useState(loadInitialTasks)
  const [query, setQuery] = useState('')
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text, priority) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      priority,
      column: 'todo',
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const moveTask = (id, targetColumn) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: targetColumn } : t))
    )
  }

  const editTask = (id, newText) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  }

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedTaskId(taskId)
  }

  const handleDropTask = (taskId, targetColumn) => {
    if (!taskId) return
    moveTask(taskId, targetColumn)
    setDraggedTaskId(null)
  }

  const filteredTasks = query.trim()
    ? tasks.filter((t) => t.text.toLowerCase().includes(query.trim().toLowerCase()))
    : tasks

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title">
          <span className="app-title-mark">▍</span>
          <div>
            <h1>Kanban Task Board</h1>
            <p className="app-subtitle">Sprint 05 · Component Architecture &amp; State Management</p>
          </div>
        </div>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Filter tasks…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            columnId={col.id}
            title={col.title}
            tasks={filteredTasks.filter((t) => t.column === col.id)}
            onAdd={addTask}
            onDelete={deleteTask}
            onMove={moveTask}
            onEdit={editTask}
            onDragStart={handleDragStart}
            onDropTask={handleDropTask}
          />
        ))}
      </main>

      <footer className="app-footer">
        <span>{tasks.length} total tasks</span>
        <span className="dot-sep">·</span>
        <span>Saved automatically to this browser</span>
      </footer>
    </div>
  )
}
