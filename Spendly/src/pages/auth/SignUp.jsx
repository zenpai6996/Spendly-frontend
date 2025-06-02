import React, { useState, useEffect, useContext } from 'react'
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper';
import { toast } from "sonner";
import ProfilePhotoSelector from '@/components/inputs/profilePhotoSelector';
import Lottie from "lottie-react";
import Loader from "../../assets/animations/Loader.json"
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { UserContext } from '@/context/userContext';
import uploadImage from '@/utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
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

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
        
    let profileImageUrl = "";

    if(!profilePic){
      toast.error(
        "Profile pic is required",{
          description:"Please upload a profile picture"
        }
      )
      return;
    }

    if (!fullName) {
      toast.error("Name Required", {
        description: "Please enter your name"
      })
      return;
    }

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
    
    setIsLoading(true);
    
    try {
      if (profilePic) {
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        } catch (error) {
          toast.error("Image Upload Error", {
            description: error.message || "Please try again with a different image"
          });
          setIsLoading(false);
          return;
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
      toast.success("Account Created", {
        description: "Redirecting to dashboard...",
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error("Registration Failed", {
          description: error.response.data.message || "Please try again",
        });
      } else {
        toast.error("Registration Error", {
          description: "Please try again later",
        });
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="flex justify-center">
              <ProfilePhotoSelector 
                image={profilePic} 
                setImage={setProfilePic}
                size="md"
              />
            </div>

            <div className="space-y-4">
              <div className='flex flex-row space-x-4'>
                <Input
                value={fullName}
                onChange={({target}) => setfullName(target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
                autoComplete="name"
              />
              
              <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                autoComplete="email"
              />
              </div>

              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Create a strong password"
                type="password"
                autoComplete="new-password"
              />
            </div>

            {password && (
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-2 text-sm">
                <p className="font-medium text-gray-700 dark:text-gray-300">Password Requirements:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li className={`flex items-center ${passwordValidation.checks.length ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                    <span className="mr-2">{passwordValidation.checks.length ? '✓' : '•'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.checks.uppercase ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                    <span className="mr-2">{passwordValidation.checks.uppercase ? '✓' : '•'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.checks.number ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                    <span className="mr-2">{passwordValidation.checks.number ? '✓' : '•'}</span>
                    One number
                  </li>
                  <li className={`flex items-center ${passwordValidation.checks.specialChar ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                    <span className="mr-2">{passwordValidation.checks.specialChar ? '✓' : '•'}</span>
                    One special symbol
                  </li>
                </ul>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <span>Creating Account</span>
                  <Lottie 
                    animationData={Loader}
                    loop={true}
                    style={{ width: 20, height: 20 }}
                  />
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp