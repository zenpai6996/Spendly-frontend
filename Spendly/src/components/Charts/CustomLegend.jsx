import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div 
      className="flex flex-wrap justify-center gap-4 mt-4 px-4 py-2" 
      style={{ 
        position: 'relative', 
        zIndex: 10,
        backgroundColor: 'transparent',
        minHeight: '40px'
      }}
    >
      {payload.map((entry, index) => (
        <div 
          key={`legend-${index}`} 
          className="flex items-center space-x-2 bg-white dark:bg-gray-600 rounded px-2 py-1"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;