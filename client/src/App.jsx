import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
