import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth'
import { authStore } from './components/Store'
import Home from './pages/Home'

const App = () => {
  const isAuth = authStore((state)=>state.isAuthenticated)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <Home /> : <Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App