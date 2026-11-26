import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

import RootLayout from './RootLayout'

// Pages
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'

const AppRouting = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RootLayout/>}></Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouting