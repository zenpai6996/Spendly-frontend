import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({data}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const colors = {
    light: {
      background: '#ffffff',
      chartBg: '#ffffff',
      text: '#374151',
      grid: '#e5e7eb',
      barEven: "#10b981",
      barOdd: "#8b5cf6",
      tooltipBg: '#ffffff',
      tooltipBorder: '#e5e7eb',
      tooltipText: '#111827',
      tooltipLabel: '#10b981',
    },
    dark: {
      background: '#111827',
      chartBg: '#1f2937',
      text: '#d1d5db',
      grid: '#374151',
      barEven: "#34d399",
      barOdd: "#a78bfa",
      tooltipBg: '#111827',
      tooltipBorder: '#374151',
      tooltipText: '#f9fafb',
      tooltipLabel: '#34d399',
    }
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const getBarColor = (index) => {
    return index % 2 === 0 ? currentColors.barEven : currentColors.barOdd;
  }

  const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length) {
      return (
        <div className={`
          shadow-lg rounded-xl p-3 border backdrop-blur-sm
          ${isDarkMode 
            ? 'bg-gray-900/95 border-gray-600 shadow-gray-900/20' 
            : 'bg-white/95 border-gray-200 shadow-gray-200/40'
          }
        `}>
          <p className={`
            text-xs font-semibold mb-2 tracking-wide uppercase
            ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}
          `}>
            {payload[0].payload.category || payload[0].payload.source}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Amount: <span className={`
              text-base font-semibold ml-1
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
             ₹{payload[0].payload.amount.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`
      mt-4 rounded-2xl p-4 transition-all duration-300 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl shadow-gray-900/20' 
        : 'bg-gradient-to-br from-white to-gray-50 shadow-lg shadow-gray-200/30'
      }
    `}>
      <ResponsiveContainer width={'100%'} height={320}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 15,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="2 4" 
            stroke={currentColors.grid}
            strokeOpacity={0.3}
          />
          <XAxis 
            dataKey={"month"} 
            tick={{
              fontSize: 11,
              fill: currentColors.text,
              fontWeight: 500
            }}
            stroke={currentColors.grid}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{
              fontSize: 11,
              fill: currentColors.text,
              fontWeight: 500
            }}
            stroke={currentColors.grid}
            tickLine={false}
            axisLine={false}
            width={50}
          />
          <Tooltip content={CustomTooltip}/>
          <Bar 
            dataKey={"amount"}
            radius={[8,8,0,0]}
            maxBarSize={60}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(index)}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart