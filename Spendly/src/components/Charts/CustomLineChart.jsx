import React from 'react';
import { 
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart 
} from 'recharts';

const CustomLineChart = ({data}) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const colors = {
    light: {
      background: '#ffffff',
      chartBg: '#ffffff',
      text: '#555',
      grid: '#f0f0f0',
      primary: "#72CD16",
      tooltipBg: '#ffffff',
      tooltipBorder: '#e5e7eb',
      tooltipText: '#111827',
      tooltipLabel: '#72CD16',
    },
    dark: {
      background: '#1f2937',
      chartBg: '#1f2937',
      text: '#e5e7eb',
      grid: '#374151',
      primary: "#86efac",
      tooltipBg: '#111827',
      tooltipBorder: '#374151',
      tooltipText: '#f9fafb',
      tooltipLabel: '#86efac',
    }
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length){
      return(
        <div className={`shadow-md rounded-lg p-2 border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
          <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-green-800'}`}>
            {payload[0].payload.category}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Amount: <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹ {payload[0].payload.amount}
            </span>
          </p>
        </div>
      )
    }
    return null;
  }

  return (
    <div className={`mt-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart 
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id='incomeGradient' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
              <stop offset={"5%"} stopColor={currentColors.primary} stopOpacity={0.4}/>
              <stop offset={"95%"} stopColor={currentColors.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={currentColors.grid}
          />
          <XAxis 
            dataKey={"month"} 
            tick={{
              fontSize: 12,
              fill: currentColors.text
            }}
            stroke={currentColors.grid}
          />
          <YAxis 
            tick={{
              fontSize: 12,
              fill: currentColors.text
            }}
            stroke={currentColors.grid}
          />
          <Tooltip content={CustomTooltip}/>
          <Area 
            type={"monotone"} 
            dataKey={"amount"} 
            stroke={currentColors.primary} 
            fill='url(#incomeGradient)' 
            strokeWidth={3} 
            dot={{ 
              r: 3, 
              fill: isDarkMode ? "#a7f3d0" : "#8df88d" 
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart