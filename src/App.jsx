
import './css/App.css';
import React from 'react';
import Home from './pages/Home';
import { MovieProvider } from './contexts/MovieContext';
import { Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';

function App() {

  return (
    <MovieProvider>
    <NavBar></NavBar>
    <main className="main-content">
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/favorites' element={<Favorites />}/>
    </Routes>
    </main>
   </MovieProvider>
  )
}

export default App

