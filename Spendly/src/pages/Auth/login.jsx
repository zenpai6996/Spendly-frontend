import React, { useState ,useEffect} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail , validatePassword} from '../../utils/helper';
import { toast } from "sonner";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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

  const navigate = useNavigate();
 
  const handleLogin = (e) => {

    if (e) e.preventDefault();
    
    if (!validateEmail(email)){
      toast.error("Invalid Email ❌",{
        description:"Please enter a valid email address",
      });
      return;
    }
    if(!passwordValidation.isValid){
      toast.error("Invalid Password ❌", {
        description: "Please enter the correct Password",
      });      return;
    }
    setError("");
     toast.success("Login Successful !!", {
      description: "Redirecting to dashboard...",
    });

    //Login API call
  };

  return (
    <AuthLayout>
      {/* <div className='lg:w-[70%] h-full flex flex-col justify-center px-4 sm:px-0'>
        <div className='mb-6 sm:mb-8'>
          <h3 className='text-2xl sm:text-xl font-semibold text-black text-center md:text-left'>
            Welcome Back
          </h3>
          <p className='text-sm text-primary mt-1 text-center md:text-left'>
            Please enter your details to Log In
          </p>
        </div>
        
        <div className='space-y-4'>
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
            placeholder="Enter Password"
            type="password"
          />

          <div className="text-xs ">
            <p className="text-slate-600 mb-1 text-sm">Password must contain:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <li className={`flex items-center ${passwordValidation.checks.length ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.length ? '✓' : '✗'} At least 8 characters
              </li>
              <li className={`flex items-center ${passwordValidation.checks.uppercase ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.uppercase ? '✓' : '✗'} At least one uppercase letter
              </li>
              <li className={`flex items-center ${passwordValidation.checks.number ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.number ? '✓' : '✗'} At least one number
              </li>
              <li className={`flex items-center ${passwordValidation.checks.specialChar ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.specialChar ? '✓' : '✗'} At least one special symbol
              </li>
            </ul>
          </div>

          <button 
            type='submit'
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-2xl mt-4 font-medium transition-all duration-300 ease-in-out 
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300"
          >
            LOGIN
          </button>
          
          <p className='text-2xs text-slate-500 text-center '>
            Don't have an account?{' '}
            <Link to="/signup" className='text-primary hover:text-green-500'>
              Sign Up
            </Link>
          </p>
        </div>
      </div> */}
       <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-2xl sm:text-xl font-semibold text-black text-center md:text-left'>
          Welcome Back
        </h3>
        <p className='text-sm text-primary mt-1 mb-7 text-center md:text-left'>
            Please enter your details to Log In
          </p>
        <form 
          onSubmit={handleLogin}
          >
            <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
              <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="johnDoe@example.com"
                type="text"
              />
              
              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Enter Password"
                type="password"
              />
               <div className="text-xs ">
            <p className="text-slate-600 mb-1 text-sm">Password must contain:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <li className={`flex items-center ${passwordValidation.checks.length ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.length ? '✓' : '✗'} At least 8 characters
              </li>
              <li className={`flex items-center ${passwordValidation.checks.uppercase ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.uppercase ? '✓' : '✗'} At least one uppercase letter
              </li>
              <li className={`flex items-center ${passwordValidation.checks.number ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.number ? '✓' : '✗'} At least one number
              </li>
              <li className={`flex items-center ${passwordValidation.checks.specialChar ? 'text-green-500' : 'text-slate-400'}`}>
                {passwordValidation.checks.specialChar ? '✓' : '✗'} At least one special symbol
              </li>
            </ul>
            </div>
            <button 
                        type='submit'
                        onClick={handleLogin}
                        className="w-full bg-primary text-white py-3 rounded-2xl mt-4 font-medium transition-all duration-300 ease-in-out 
                                hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300"
                      >
                        LOGIN
                      </button>
                      
                      <p className='text-2xs text-slate-500 text-center mb-3 '>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-primary hover:text-green-500'>
                          Sign Up
                        </Link>
                      </p>
            </div>
          </form>
      </div>
    </AuthLayout>
  );
};

export default Login;