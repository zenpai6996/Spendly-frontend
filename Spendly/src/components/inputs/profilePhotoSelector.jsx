import React, { useRef ,useState } from 'react';
import { LuUser,LuUpload,LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image , setImage}) => {
  
  const inputRef = useRef(null);
  const [previewUrl, setpreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(file){
      setImage(file);
      const preview = URL.createObjectURL(file);
      setpreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setpreviewUrl(null);
  } 
  const onChooseFile = () => {
    inputRef.current.click();
  }

  return (
    <div className='flex justify-center mb-6'>
      <input 
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />
      {!image ? (
        <div className='w-15 h-15 flex items-center justify-center bg-green-200 rounded-full relative '>
           <LuUser className='text-4xl text-primary'/>
           <button
            type='button'
            className='w-6 h-6 flex cursor-pointer items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
           >
              <LuUpload/>
          </button> 
        </div>
      ):(
        <div className='relative '>
          <img
            src={previewUrl}
            alt='Profile Photo'
            className='w-15 h-15 rounded-full object-cover'
          />
          <button 
            type='button'
            className='w-6 h-6 flex cursor-pointer items-center justify-center bg-red-400 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
          >
            <LuTrash/>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector

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