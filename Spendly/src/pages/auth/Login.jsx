import React, { useState, useEffect, useContext } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper';
import { toast } from "sonner";
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { UserContext } from '@/context/userContext';
import Lottie from "lottie-react";
import Loader from "../../assets/animations/Loader.json"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    checks: {
      length: false,
      uppercase: false,
      number: false,
      specialChar: false
    }
  });

  useEffect(() => {
    if (password) {
      setPasswordValidation(validatePassword(password));
    } else {
      setPasswordValidation({
        isValid: false,
        checks: {
          length: false,
          uppercase: false,
          number: false,
          specialChar: false
        }
      });
    }
  }, [password]);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address",
      });
      return;
    }
    if (!passwordValidation.isValid) {
      toast.error("Invalid Password", {
        description: "Password doesn't meet requirements",
      });      
      return;
    }
    
    setError("");
    setIsLoading(true);
   
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
      toast.success("Login Successful", {
        description: "Redirecting to dashboard...",
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        toast.error("Login Failed", {
          description: error.response.data.message || "Please try again",
        });
      } else {
        setError("Something went wrong. Please try again");
        toast.error("Login Error", {
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <AuthLayout>
      <div className='w-full max-w-xl mx-auto px-4 sm:px-0'>
        <div className='text-center space-y-1 mb-8'>
           <h2 class="text-5xl  font-extrabold bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] text-center md:text-center ">Spendly</h2>
         
          <p className='text-gray-500 dark:text-gray-400 text-sm'>
            Sign in to your account to continue
          </p>
        </div>

        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 space-y-6'>
          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-5'>
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
              />
              
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
              />
            </div>

            {password && (
              <div className="bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2"></div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    Password Requirements
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'length', text: '8+ chars' },
                    { key: 'uppercase', text: 'Uppercase' },
                    { key: 'number', text: 'Number' },
                    { key: 'specialChar', text: 'Symbol' }
                  ].map(({ key, text }) => (
                    <div key={key} className={`flex items-center text-xs transition-all duration-300 ${
                      passwordValidation.checks[key] 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        passwordValidation.checks[key]
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 scale-110'
                          : 'bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-500'
                      }`}>
                        {passwordValidation.checks[key] ? '✓' : '○'}
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              type='submit'
              disabled={isLoading}
              className={`
                w-full relative overflow-hidden group
                bg-gradient-to-r from-emerald-600 to-green-500 
                hover:from-emerald-700 hover:to-green-600
                text-white font-medium py-3 px-6 rounded-xl
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-emerald-500/20
                focus:outline-none focus:ring-2 focus:ring-emerald-300/50 dark:focus:ring-emerald-800/50
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-sm">Signing in</span>
                  <Lottie 
                    animationData={Loader}
                    loop={true}
                    style={{ width: 20, height: 20 }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm">Sign In</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className='font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-300'
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;