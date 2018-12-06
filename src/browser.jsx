import React from 'react'
import * as ReactDOM from 'react-dom'
import { Todos } from './components/Todos'
import { TodoState } from './state/TodoState'

// This script runs in the client browser.

// Retrieve and decode initial state from LocalStorage and build the Mobx state
// instance.
const rehydrateState = () => {
  const encodedState = window.localStorage.getItem('state')
  const initialStateString = Buffer.from(encodedState, 'base64').toString()
  const initialStateObject = JSON.parse(initialStateString)
  console.log(initialStateObject)
  return new TodoState(initialStateObject)
}
const state = rehydrateState()

// ReactDOM.hydrate maps the redered React app to the source HTML so that React
// can take over managing the DOM. If the html generated from this rendering
// doesn't match the source HTML the app won't work properly and React will log
// an error.
ReactDOM.hydrate(<Todos state={state} />, document.getElementById('container'))
