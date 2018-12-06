import React from 'react'
import * as MobxReact from 'mobx-react'

import { Todo } from './Todo'
import { TodoForm } from './TodoForm'

import { styles } from './styles'

// Here we define the base class for our Todos component. Mobx will tell the
// component to update whenever any observable Mobx object referenced in the
// class's render method changes. In this case, the todos list.
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

// Since the Todos component depends on Mobx to tell it when to update - the
// actual class we export is wrapped with Mobx's observer function so that
// Mobx knows to inform the component when to update.
const Todos = MobxReact.observer(TodosBaseClass)

export { Todos }
