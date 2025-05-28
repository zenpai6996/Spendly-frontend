import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard/DashBoard';
import Income from './pages/Dashboard/Income';
import Expenses from './pages/Dashboard/Expenses';
import { Toaster } from "sonner";
import UserProvider from './context/userContext';
import Home from './pages/Landing/Home';



const App = () => {
  return (
  <>
  <UserProvider>
    <Router>
    <Routes>
      <Route path='/' element={<Root/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/dashboard' exact element={<Dashboard/>}/>
      <Route path='/home' exact element={<Home/>}/>
      <Route path='/income' exact element={<Income/>}/>
      <Route path='/expense' exact element={<Expenses/>}/>
    </Routes>
  </Router>
<Toaster 
  position="top-right"
  richColors
  theme="light" 
  toastOptions={{
    classNames: {
      toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      description: 'group-[.toast]:text-muted-foreground',
      actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
      cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    },
    style: {
      fontFamily:'Ubuntu',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    }
  }}
  />
  </UserProvider>
  </>
  )
}

export default App

const Root = () => {
  //check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated 
  return isAuthenticated ? (
    <Navigate to={"/dashboard"}/>
  ):(
    <Navigate to={"/login"}/>
  );
};