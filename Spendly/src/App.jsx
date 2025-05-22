import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard/DashBoard';
import Income from './pages/Dashboard/Income';
import Expenses from './pages/Dashboard/Expenses';
import { Toaster } from "sonner";



const App = () => {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Root/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/dashboard' exact element={<Dashboard/>}/>
      <Route path='/income' exact element={<Income/>}/>
      <Route path='/expense' exact element={<Expenses/>}/>
    </Routes>
  </Router>
  <Toaster position="bottom-right" richColors />

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