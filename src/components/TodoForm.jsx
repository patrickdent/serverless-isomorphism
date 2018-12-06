import React from 'react'

import { styles } from './styles'

// This component is stateless; it doesn't require any configuration for Mobx.
const TodoForm = ({onSubmit}) => {

  // This submits the form when the user hits 'enter' by calling the Mobx
  // funtion that is passed to it. Since it's an action and not an obseravble
  // object, we don't need to involve Mobx any further.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event.target.value)
      event.target.value = ''
    }
  }

  // The 'state' of this component is handled natively by leveraging an html
  // input element.
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

export { TodoForm }
