import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as Mobx from 'mobx'
import { Todos } from './components/Todos'
import { TodoState } from './state/TodoState'

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

const htmlData = `
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Serverlessly Rendered</title>
</head>
<body>
    <div class="container">
      <div id="container"></div>
    </div>
    <script type="text/javascript" src="browser.js"></script>
    <script>
      window.localStorage.setItem('state','${dehydrateState(state)}');
    </script>
</body>
</html>
`
export const render = (req, res) => {
  const html = ReactDOMServer.renderToString(<Todos state={state}/>);

  return res.send(
    htmlData.replace('<div id="container"></div>', `<div id="container">${html}</div>`)
  )
}
