import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Toto from './pages/Toto.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Toto />} />
      </Routes>
      
    </>
  )
}

export default App
