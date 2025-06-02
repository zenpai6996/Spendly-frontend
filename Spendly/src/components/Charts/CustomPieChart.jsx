import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  colors,
  totalAmount,
  showTextAnchor,
}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className={`
      mt-4 rounded-2xl p-4 transition-all duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl shadow-gray-900/20' 
        : 'bg-gradient-to-br from-white to-gray-50 shadow-lg shadow-gray-200/30'
      }
    `}>
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <defs>
            <filter id="pieGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {showTextAnchor && (
            <text 
              x="50%"
              y="30%"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`
                transition-colors duration-300
                ${isDarkMode ? 'fill-gray-200' : 'fill-gray-700'}
              `}
              fontSize="15px"
              fontWeight="500"
            >
              {label}
              <tspan 
                x="50%" 
                dy="35" 
                className={`
                  ${isDarkMode ? 'fill-white' : 'fill-gray-800'}
                `}
                fontSize="22px" 
                fontWeight="600"
              >
                {totalAmount}
              </tspan>
            </text>
          )}
          <Pie 
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={95}
            labelLine={false}
            stroke={isDarkMode ? "#374151" : "#ffffff"}
            strokeWidth={2}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                style={{
                  filter: isDarkMode 
                    ? 'brightness(1.1) saturate(1.2)' 
                    : 'brightness(1) saturate(1.1)'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart