import { Routes, Route, Navigate } from "react-router-dom";
import Quiz from './Components/Quiz/Quiz';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Signup from "./Components/Signup/Signup";
import Dashboard from './Components/Dashboard/Dashboard';
import LandingPage from "./Components/LandingPage/LandingPage";
import Profile from './Components/Profile/Profile'
import './App.css';
import PlatformPage from "./Pages/PlatformPage";

const App = () => (
  <Routes>
    <Route exact path='/' element={<LandingPage />} />
    <Route exact path='/slag' element = {<Navigate to='/'/>}/>
    <Route exact path='/home' element={<Home/>} />
    <Route exact path='/quiz' element={<Quiz />} />
    <Route exact path='/dashboard' element={<Dashboard />} />
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/signup' element={<Signup />} />
    <Route exact path='/profile' element={<Profile/>} />
    <Route exact path='/platform' element={<PlatformPage/>}/>
  </Routes>
)

export default App;