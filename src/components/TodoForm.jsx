import React from 'react'
import * as MobxReact from 'mobx-react'

import { styles } from './styles'

class TodoFormBaseClass extends React.Component {
  render() {
    const { onSubmit } = this.props
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
}

const TodoForm = MobxReact.observer(TodoFormBaseClass)

export { TodoForm }
