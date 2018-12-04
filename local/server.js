const http = require('http')
const express = require('express')

const port = 3000

// This function creates an Express app to emulate Google Cloud Platform's Cloud Fucntion httpTrigger[s] then registers all of the Google Cloud function handlers with the Express app. For now the "functions" parameter is just the exports from our index.js file.
const setUpApp = (functions) => {
  const newApp = express()
  for (let func in functions) {
    console.log(`registered http://localhost:${port}/${func}`)
	  // Create an "httpsTrigger" for every export. We can do this by registering each of our Cloud Functions with our Express app using the `.get(routeName, function)` syntax. Since Google Cloud Functions are based off of Express we don't have to make any changes to the function we wrote in our index.js file.
    newApp.get(`/${func}`, functions[func])
  }
  // newApp.use('/static', express.static(path.join(__dirname)))
  return newApp
}

// Create the Express app with all of the Cloud Function handlers and add it as a listner on our Cloud Function emulation server.
const initialApp = setUpApp(require('../cloud.js'))
const server = http.createServer(initialApp)
server.listen(port)

// Save the intiial app so we can remove it from the server when there are Webpack Hot Module Reload updates.
let currentApp = initialApp

if (module.hot) {
  module.hot.accept('../cloud.js', () => {
    // Create a new Express app with the updated Cloud Function handlers.
    const newApp = setUpApp(require('../cloud.js'))
    // Remove the old Express app.
    server.removeListener('request', currentApp)
    // Register the new app with the server.
    server.on('request', newApp)
    // Save the current app so we can remove it when there are updates.
    currentApp = newApp
  })
}
