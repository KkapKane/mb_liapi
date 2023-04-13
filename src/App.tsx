import { useState } from 'react'
import Canvas from './Components/Canvas'
import "./style.scss"
import Sidebar from './Components/sidebar/Sidebar'
import Rankbar from './Components/rankbar/Rankbar'

function App() {

  return (
    <div className="App">
      <Sidebar />
      <Rankbar />
      <Canvas />
    </div>
  )
}

export default App
