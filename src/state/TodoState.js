import * as Mobx from 'mobx'

// This is the base class for all of our stores. It contains a constructor that
// builds the store from a json object and an action to update attributes.
class TodoState {
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

// Once Javascript Decorators become a stable feature we can replace this with
// the corresponding decorators.
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
