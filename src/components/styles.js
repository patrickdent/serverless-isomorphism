const standardPadding = '10px'
const sharedBorderStyles = {
  backgroundColor: 'white',
  border: '1px solid #b4c9ed',
  padding: standardPadding
}

const styles = {
  todosContainer: {
    textAlign: 'center'
  },
  todos: {
    width: '25%',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#d7e2f4',
    textAlign: 'left',
    padding: '1% 5%'
  },
  clearCompleteButton: {
    padding: standardPadding,
    backgroundColor: 'white'
  },
  todo: {
    margin: '5px 0',
    ...sharedBorderStyles
  },
  todoForm: {
    position: 'relative',
    margin: '1% 25%',
    ...sharedBorderStyles
  },
  todoInput: {
    padding: standardPadding
  }
}

export { styles }
