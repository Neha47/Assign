import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './userAuth/Login'
import SignUp from './userAuth/SignUp'
import Home from './userAuth/Home'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/home" element={<Home/>}/>
           <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
