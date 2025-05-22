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