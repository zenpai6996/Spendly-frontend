import React, { useState } from 'react'

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3 tracking-wide">
        {label}
      </label>
      <div className={`
        relative w-full group
        bg-white dark:bg-gray-900/50 
        rounded-2xl border-2 transition-all duration-300 ease-in-out
        ${isFocused || value 
          ? 'border-green-500 shadow-lg shadow-green-500/20 bg-green-50/30 dark:bg-green-900/10' 
          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
        }
      `}>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={`
            w-full bg-transparent outline-none 
            px-4 py-4 pr-12 text-gray-700 dark:text-gray-300
            placeholder-gray-400 dark:placeholder-gray-500
            font-medium text-base
            transition-all duration-300
            ${type === 'password' ? 'pr-14' : 'pr-4'}
          `}
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className={`
              absolute right-4 top-1/2 transform -translate-y-1/2
              w-8 h-8 flex items-center justify-center rounded-full
              transition-all duration-300 ease-in-out
              hover:bg-gray-100 dark:hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-green-500/50
              ${isFocused ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}
            `}
          >
            {showPassword ? (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110"
              >
                <path 
                  d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" 
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="transition-transform duration-300 hover:scale-110"
              >
                <path 
                  d="M12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 13.66 15 12C15 10.34 13.66 9 12 9ZM3.71 3.29L20.7 20.29L19.29 21.7L2.29 4.71L3.71 3.29Z" 
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        )}

        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 
          transition-all duration-300 ease-out
          ${isFocused || value ? 'w-full' : 'w-0'}
        `}></div>

        {(isFocused || value) && (
          <div className="absolute -top-2 left-3 px-2 bg-white dark:bg-gray-800 text-xs font-semibold text-green-600 dark:text-green-400 animate-pulse">
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input