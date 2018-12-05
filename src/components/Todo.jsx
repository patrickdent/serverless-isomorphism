import React from 'react'
import * as MobxReact from 'mobx-react'

import { styles } from './styles'

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

const Todo = MobxReact.observer(TodoBaseClass)

export { Todo }
