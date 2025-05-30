import React ,{useState,useEffect,useContext}from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail , validatePassword} from '../../utils/helper';
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

  const {updateUser} = useContext(UserContext);
  

  const navigate = useNavigate();

  //Handle Sign up Form Submit
  const handleSignUp = async (e) => {
      if (e) e.preventDefault();
          
          let profileImageUrl = "";

          if(!fullName){
            toast.error("No Username ❌",{
              description:"Please enter you name"
            })
          }

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
          
          setIsLoading(true);
          
          //Sign up API call
          try{

            //upload profile image to database 
            if(profilePic){
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

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
              fullName,
              email,
              password,
              profileImageUrl
            });
            const {token ,user } = response.data;
            
            if(token){
              localStorage.setItem("token",token);
              updateUser(user);
              navigate("/dashboard");
            }
             toast.success("Sign Up Successful !!", {
             description: "Redirecting to dashboard...",
          });
          }catch(error){
            if(error.response && error.response.data.message){
             
               toast.error("Incorrect Credentials ",{
                description:"Please try again",
              });
            }else{
              toast.error("Something went wrong ",{
                      description:"Please try again",
                    });
            }
          }finally{
            setIsLoading(false)
          }

          

  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl sm:text-2xl dark:text-gray-300 font-semibold text-black text-center md:text-left'>
          Create an Account
        </h3>
        <p className='text-sm text-primary mt-1 mb-3 text-center md:text-left'>
            Join us today by entering you details below
          </p>
        <form 
          onSubmit={handleSignUp}
          >

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

            <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={({target}) => setfullName(target.value)}
                label={"Full Name"}
                placeholder={"John Doe"}
                type={"text"}
              />
              <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="johndoe@example.com"
                type="text"
              />
              </div>
              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="Enter Password"
                type="password"
              />
               <div className="text-xs ">
            <p className="text-slate-600 dark:text-gray-300 mb-1 text-sm">Password must contain:</p>
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
                        disabled={isLoading}
                        onClick={handleSignUp}
                        className={`w-full cursor-pointer bg-primary text-white py-3 rounded-2xl mt-4 font-medium transition-all duration-300 ease-in-out 
                                hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                          
                            <span className="mr-2">Signing in </span>
                              <Lottie 
                              animationData={Loader}
                              loop={true}
                              style={{ width: 50, height: 50 }}
                            />
                          </div>
                        ) : (
                          "SIGN IN"
                        )}
                      </button>
                      
                      <p className='text-2xs text-slate-500 dark:text-gray-300 text-center mb-3 '>
                        Already have an account?{' '}
                        <Link to="/login" className='text-primary hover:text-green-500'>
                          Log In
                        </Link>
                      </p>
            </div>
          </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp