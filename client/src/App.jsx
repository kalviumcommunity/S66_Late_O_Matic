import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExcuseCard from './components/excuseCard'
import AddExcuseForm from './components/AddExcuseForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/excuses" element={<ExcuseCard />} />
        <Route path='/add-excuse' element={<AddExcuseForm/>} />
      </Routes>
    </Router>
  )
}

export default App
