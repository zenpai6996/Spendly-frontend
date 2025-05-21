import React, { useState } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    // Login logic would go here
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black text-center md:text-left'>Welcome Back</h3>
        <p className='text-sm text-slate-700 mt-1 text-center md:text-left'>
          Please enter your details to Log In
        </p>
        
        <div className='mt-8'>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}
          
          <button 
            type='submit'
            onClick={handleLogin}
            className="w-full bg-primary cursor-pointer text-white py-3 rounded mt-8 font-medium transition-all duration-300 ease-in-out 
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300"
          >
            Log In
          </button>
          <p className='text-2xs text-slate-500 text-center mt-3'>Don't have an account? <Link to="/signup" className='text-primary cursor-pointer hover:text-green-500'>Sign Up</Link></p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;