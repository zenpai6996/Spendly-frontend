import React from 'react';

const CustomLegend = ({ payload }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div 
      className="flex flex-wrap justify-center gap-3 mt-6 px-4 py-3" 
      style={{ 
        position: 'relative', 
        zIndex: 10,
        backgroundColor: 'transparent',
        minHeight: '50px'
      }}
    >
      {payload.map((entry, index) => (
        <div 
          key={`legend-${index}`} 
          className={`
            flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200
            hover:scale-105 hover:shadow-md cursor-default
            ${isDarkMode 
              ? 'bg-gray-700/80 hover:bg-gray-700 shadow-gray-900/20' 
              : 'bg-white/90 hover:bg-white shadow-gray-200/30'
            }
          `}
          style={{ 
            boxShadow: isDarkMode 
              ? '0 2px 8px rgba(0,0,0,0.2)' 
              : '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" 
            style={{ 
              backgroundColor: entry.color,
              boxShadow: `0 0 0 2px ${entry.color}20`
            }}
          ></div>
          <span className={`
            text-sm font-medium whitespace-nowrap
            ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
          `}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;