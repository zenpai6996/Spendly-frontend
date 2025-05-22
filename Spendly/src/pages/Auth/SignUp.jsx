import React ,{useState,useEffect}from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail , validatePassword} from '../../utils/helper';
import { toast } from "sonner";
import ProfilePhotoSelector from '@/components/inputs/profilePhotoSelector';

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
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

  //Handle Sign up Form Submit
  const handleSignUp = async (e) => {
      if (e) e.preventDefault();
          
          let profileImageUrl = "";

          if(!fullName){
            toast.error("No UserName ❌",{
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
          setError("");
          
          //Sign up API call

           toast.success("Login Successful !!", {
            description: "Redirecting to dashboard...",
          });

  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-2xl sm:text-xl font-semibold text-black text-center md:text-left'>
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
                        onClick={handleSignUp}
                        className="w-full bg-primary text-white py-3 rounded-2xl mt-4 font-medium transition-all duration-300 ease-in-out 
                                hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300"
                      >
                        SIGN UP
                      </button>
                      
                      <p className='text-2xs text-slate-500 text-center mb-3 '>
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