import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExcuseCard from './components/ExcuseCard';
import AddExcuseForm from './components/AddExcuseForm';
import UpdateExcuseForm from './components/UpdateExcuseFrom';
import Signup from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/excuses" element={<ExcuseCard />} />
          <Route path="/add-excuse" element={<AddExcuseForm />} />
          <Route path="/update-excuse/:id" element={<UpdateExcuseForm />} />
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>

    </div>

  );
}

export default App;
