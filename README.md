# Delivering Rendered React from Google Cloud Functions

This is a companion repo to [my article on Medium](https://medium.com/tech-at-nordstrom/delivering-rendered-react-from-google-cloud-functions-a61a39b0970e).

## Setup

1. Install [Node.js](https://nodejs.org/en/)
2. Follow the Google Cloud CLI [quickstart guide](https://cloud.google.com/pubsub/docs/quickstart-cli)
3. `$ npm install`

## Emulate Google Cloud Functions locally

1. `$ npm run local`
2. Visit http://localhost:3000/render in your web browser.

## Deploy to Google Cloud

1. `$ npm run build && npm run deploy`
