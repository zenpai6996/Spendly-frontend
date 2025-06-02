import React from 'react'

const CustomTooltip = ({active , payload}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  if(active && payload && payload.length){
    return(
      <div className={`
        backdrop-blur-sm shadow-lg rounded-xl p-3 border transition-all duration-200
        ${isDarkMode 
          ? 'bg-gray-900/95 border-gray-600 shadow-gray-900/30' 
          : 'bg-white/95 border-gray-200 shadow-gray-200/40'
        }
      `}>
        <p className={`
          text-xs font-semibold mb-2 tracking-wide uppercase
          ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}
        `}>
          {payload[0].name}
        </p>
        <p className={`
          text-sm
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Amount: {" "}
          <span className={`
            text-base font-semibold ml-1
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            ₹{payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip