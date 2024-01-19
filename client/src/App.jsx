import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ReadPage from './pages/ReadPage';
import PublicarPage from './pages/PublicarPage';
import './App.css'
import axios from 'axios';
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={ <HomePage />} />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/start' element={ <LandingPage /> } />
            <Route path='/publicar' element={ <PublicarPage /> } />
            <Route path='/post/:id' element={ <ReadPage /> } />
          </Route>
        </Routes>
      </UserContextProvider>
  )
}

export default App
