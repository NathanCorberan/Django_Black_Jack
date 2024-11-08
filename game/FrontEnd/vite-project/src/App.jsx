import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
