import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Home from './components/home';
import Private from './components/Private';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Administer from './components/Administer';

const Index = () => {



  return (
    <BrowserRouter>
      <Routes>

        <Route>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<App />} />
          <Route path='/home' element={<Private>{<Home />}</Private>} />
          <Route path='/profile' element={<Private>{<Profile />}</Private>} />
          <Route path='/admin' element={<Admin>{<Administer />}</Admin>} />







        </Route>
      </Routes>
    </BrowserRouter>

  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Index />)