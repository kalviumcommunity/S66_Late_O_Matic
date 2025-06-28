import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExcuseCard from './components/excuseCard';
import AddExcuseForm from './components/AddExcuseForm';
import UpdateExcuseForm from './components/UpdateExcuseFrom';
import Signup from './components/SignUp';
import Login from './components/Login';
import MyExcuses from './components/MyExcuses';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col dark bg-gray-900 text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/excuses" element={<ExcuseCard />} />
            <Route path="/add-excuse" element={<AddExcuseForm />} />
            <Route path="/update-excuse/:id" element={<UpdateExcuseForm />} />
            <Route path='/sign-up' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/my-excuses" element={<MyExcuses />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
