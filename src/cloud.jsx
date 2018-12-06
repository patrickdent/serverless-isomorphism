import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as Mobx from 'mobx'
import { Todos } from './components/Todos'
import { TodoState } from './state/TodoState'

// Here we simply define the state in a literal. For the sake of this demo,
// let's pretend that we needed to use an API key to access our todo list and
// thus have a reason to be doing server-side rendering.
const state = new TodoState({
  todos: [{
    todo: 'build an isomorphic app',
    complete: false
  }]
})

// Stringify and encode the state to be injected into LocalStorage.
const dehydrateState = (state) => {
  const stringifiedStore = JSON.stringify(Mobx.toJS(state, true))
  return Buffer.from(stringifiedStore).toString('base64')
}

const bundleUrl = process.env.NODE_ENV === 'production' ? 'https://storage.googleapis.com/todo-assets/browser.js' : 'browser.js'

// This is the template for the source html we will be sending to the browser.
// In it we have 3 important elements:
// - a div element to insert the React html into
// - a script tag to retrieve our JavaScript so that our app runs in the browser
// - a script to inject our encoded state into LocalStorage
const htmlData = `
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Serverlessly Rendered and Isomorphic</title>
</head>
<body>
    <div id="container"></div>
    <script type="text/javascript" src='${bundleUrl}'></script>
    <script>
      window.localStorage.setItem('state','${dehydrateState(state)}');
    </script>
</body>
</html>
`

const todo = (req, res) => {
  const html = ReactDOMServer.renderToString(<Todos state={state}/>);

  return res.send(
    htmlData.replace('<div id="container"></div>', `<div id="container">${html}</div>`)
  )
}

// Since we are rendering this in a Google Cloud Function, we use a named exoprt
// that we can reference in our deploy script. This also makes it easy to use
// this funtion in an Express app locally to emulate the cloud during
// development (see local/server.js for more information on this).
export { todo }
