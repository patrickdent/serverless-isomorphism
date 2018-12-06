import React from 'react'
import * as MobxReact from 'mobx-react'

import { styles } from './styles'

// Here we define the base class for our Todo component. Mobx will tell the
// component to update whenever any observable Mobx object referenced in the
// class's render method changes. In this case, the todo item.
class TodoBaseClass extends React.Component {
  render() {
    const { todo, onChange } = this.props
    return (
      <div
        className='todo'
        style={styles.todo}>
        <input
          type='checkbox'
          value={todo.todo}
          checked={todo.complete}
          onChange={() => onChange(todo)}
          />
        <label className='todoLabel'>{todo.todo}</label>
      </div>
    )
  }
}

// Since the Todo component depends on Mobx to tell it when to update - the
// actual class we export is wrapped with Mobx's observer function so that
// Mobx knows to inform the component when to update.
const Todo = MobxReact.observer(TodoBaseClass)

export { Todo }
