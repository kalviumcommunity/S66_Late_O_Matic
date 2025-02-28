import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExcuseCard from './components/excuseCard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/excuses" element={<ExcuseCard />} />
      </Routes>
    </Router>
  )
}

export default App
