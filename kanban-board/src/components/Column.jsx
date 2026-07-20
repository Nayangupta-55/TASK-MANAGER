import { useState } from 'react'
import TaskCard from './TaskCard.jsx'
import AddTaskForm from './AddTaskForm.jsx'

export default function Column({
  columnId,
  title,
  tasks,
  onAdd,
  onDelete,
  onMove,
  onEdit,
  onDragStart,
  onDropTask,
}) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    onDropTask(taskId, columnId)
  }

  return (
    <section
      className={`column column-${columnId} ${isOver ? 'column-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <span className="column-dot" />
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </header>

      {columnId === 'todo' && <AddTaskForm onAdd={onAdd} />}

      <div className="column-body">
        {tasks.length === 0 && (
          <p className="empty-state">Nothing here — drag a card over or add one.</p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMove={onMove}
            onEdit={onEdit}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </section>
  )
}
