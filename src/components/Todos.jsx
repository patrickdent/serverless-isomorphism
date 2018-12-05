import React from 'react'
import * as MobxReact from 'mobx-react'

import { Todo } from './Todo'
import { TodoForm } from './TodoForm'

import { styles } from './styles'

class TodosBaseClass extends React.Component {
  render () {
    const { state } = this.props

    return (
      <div className='todosContainer' style={styles.todosContainer}>
        <header className='todoHeader'>
          <h1 className='todoTitle'>Todo List</h1>
        </header>
        <TodoForm onSubmit={state.addTodo} />
        <div className='todos' style={styles.todos}>
          <div>
            { state.todos.map(todo => <Todo key={todo.todo} onChange={state.toggleComplete} todo={todo} />) }
          </div>
          <button onClick={state.clearComplete} style={styles.clearCompleteButton}>clear complete</button>
        </div>
      </div>
    )
  }
}

const Todos = MobxReact.observer(TodosBaseClass)

export { Todos }
