import * as Mobx from 'mobx'

// This is a simple example of a Mobx store. We will use it to manage the state
// of our app.
class TodoState {
  // The state is instantiated from a JSON object. This is so that we can easily
  // seralize and deserailize the state between the server and the broswer.
  constructor (initialState) {
    Object.assign(this, initialState)
    this.addTodo = this.addTodo.bind(this)
    this.clearComplete = this.clearComplete.bind(this)
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  addTodo(todo) {
    this.todos.push({ todo: todo, complete: false })
  }

  clearComplete() {
    this.todos = this.todos.filter(t => !t.complete)
  }
}

// This turns the class into a Mobx class, indicates which fields should be
// observable (i.e. inform components when they update), and which methods
// affect state (we don't use any features that depend on this in this demo).
Mobx.decorate(
  TodoState,
  {
    todos: Mobx.observable,
    toggleComplete: Mobx.action,
    addTodo: Mobx.action,
    clearComplete: Mobx.action
  }
)

export { TodoState }
