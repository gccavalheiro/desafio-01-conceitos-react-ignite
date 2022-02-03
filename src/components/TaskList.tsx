import { useState, useRef } from 'react'
import { v4 as uuid } from "uuid";

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return inputRef.current?.focus()

    const newTask = {
      id: uuid(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(tasks => [...tasks, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const checkedTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task)

    setTasks(checkedTask)
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(event) => setNewTaskTitle(event.target.value)}
            value={newTaskTitle}
            ref={inputRef}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}