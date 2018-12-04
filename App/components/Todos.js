import React from 'react'

import { styles } from './styles'

const Todo = ({todo, onChange}) => {
  return (
    <div
      className='todo'
      style={styles.todo}>
      <input
        type='checkbox'
        value={todo.todo}
        checked={todo.complete}
        onChange={() => onChange(todo, {complete: !todo.complete})}
      />
      <label className='todoLabel'>{todo.todo}</label>
    </div>
  )
}

const TodoForm = ({onSubmit}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event.target.value)
      event.target.value = ''
    }
  }
  return (
    <div
      className='todoForm'
      style={styles.todoForm}>
      <input
        type='text'
        placeholder='What needs doing?'
        style={styles.todoInput}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

class Todos extends React.PureComponent {
  render () {
    const { todos, updateTodo, addTodo, clearComplete } = this.props

    return (
      <div className='todosContainer' style={styles.todosContainer}>
        <header className='todoHeader'>
          <h1 className='todoTitle'>Todo List</h1>
        </header>
        <TodoForm onSubmit={addTodo} />
        <div className='todos' style={styles.todos}>
          <div>
            { todos.map(todo => <Todo key={todo.todo} onChange={updateTodo} todo={todo} />) }
          </div>
          <button onClick={clearComplete} style={styles.clearCompleteButton}>clear complete</button>
        </div>
      </div>
    )
  }
}

export { Todos }
