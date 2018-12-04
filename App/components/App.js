import React from 'react'
const styles = {
  titleBar: {
    backgroundColor: 'black',
    color: 'white'
  },
  date: {
    color: 'blue',
    backgroundColor: 'gray',
    textAlign: 'center'
  }
}
export default function App() {
  return (
    <div>
      <h1 className="title-bar" style={styles.titleBar}>Hello from the cloud!</h1>
    </div>
  )
}
