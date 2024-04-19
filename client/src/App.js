import './App.css';
import Navbar from './Components/Navbar';
import Landing from './Pages/Landing';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<>
          <Navbar />
          <Landing />
        </>} />
      </Routes>
    </>
  )
}

export default App;