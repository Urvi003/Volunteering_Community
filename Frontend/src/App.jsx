import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import About from "./components/About";
import Contact from "./components/Contact";
import Donate from "./components/Donate";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import AdminLogin from './components/AdminLogin';
import VolunteerRegistration from './components/VolunteerRegistration';
import EventRegistration from './components/EventRegistration';
import AdminDashboard from "./components/AdminDashboard";
import VolunteerLogin from './components/VolunteerLogin';
import VolunteerDashboard from './components/VolunteerDashboard';
import AccountPage from './components/AccountPage';


const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/donate' element={<Donate/>} />
          <Route path='*' element={<NotFound/>}/>
          <Route path="/AdminLogin" element={<AdminLogin/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/VolunteerRegistration" element={<VolunteerRegistration />} />
          <Route path="/EventRegistration" element={<EventRegistration />} />
          <Route path="/VolunteerLogin" element={<VolunteerLogin/>} />
          <Route path="/VolunteerDashboard" element={<VolunteerDashboard/>} />
          <Route path="/account" element={<AccountPage/>} />
        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App
