import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, size = "md" }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const sizeClasses = {
    sm: {
      container: 'w-20 h-20',
      icon: 'text-3xl',
      button: 'w-5 h-5 -bottom-1 -right-1'
    },
    md: {
      container: 'w-24 h-24',
      icon: 'text-4xl',
      button: 'w-6 h-6 -bottom-1 -right-1'
    },
    lg: {
      container: 'w-32 h-32',
      icon: 'text-5xl',
      button: 'w-8 h-8 -bottom-2 -right-2'
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-2">
      <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      
      {!image ? (
        <div className={`relative ${sizeClasses[size].container} flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-full group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20`}>
          <LuUser className={`${sizeClasses[size].icon} text-emerald-600 dark:text-emerald-400 opacity-80 group-hover:opacity-100`} />
          <button
            type="button"
            className={`absolute ${sizeClasses[size].button} flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all duration-300 shadow-md cursor-pointer`}
            onClick={onChooseFile}
          >
            <LuUpload className="text-xs" />
          </button>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className={`${sizeClasses[size].container} rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20`}
          />
          <button 
            type="button"
            className={`absolute ${sizeClasses[size].button} flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 shadow-md cursor-pointer`}
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;