import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExcuseCard from './components/ExcuseCard';
import AddExcuseForm from './components/AddExcuseForm';
import UpdateExcuseForm from './components/UpdateExcuseFrom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/excuses" element={<ExcuseCard />} />
        <Route path="/add-excuse" element={<AddExcuseForm />} />
        <Route path="/update-excuse/:id" element={<UpdateExcuseForm />} />
      </Routes>
    </Router>
  );
}

export default App;
