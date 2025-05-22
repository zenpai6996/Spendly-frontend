import React, { useState } from 'react'

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

 return (
    <div className="mb-1">
      <label className="text-sm text-slate-800 block mb-2">
        {label}
      </label>
      <div className={`w-full flex justify-between items-center gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 border ${
        isFocused || value ? 'border-green-500' : 'border-slate-200'
      } transition-colors duration-200`}>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <div onClick={toggleShowPassword} className="cursor-pointer">
            {showPassword ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                <path d="M12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 13.66 15 12C15 10.34 13.66 9 12 9ZM3.71 3.29L20.7 20.29L19.29 21.7L2.29 4.71L3.71 3.29Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input