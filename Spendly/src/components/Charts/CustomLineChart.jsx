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
      text: '#374151',
      grid: '#e5e7eb',
      primary: "#10b981",
      primaryLight: "#6ee7b7",
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
      primary: "#34d399",
      primaryLight: "#6ee7b7",
      tooltipBg: '#111827',
      tooltipBorder: '#374151',
      tooltipText: '#f9fafb',
      tooltipLabel: '#34d399',
    }
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length){
      return(
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
            {payload[0].payload.category}
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
      )
    }
    return null;
  }

  return (
    <div className={`
      mt-4 rounded-2xl p-4 transition-all duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl shadow-gray-900/20' 
        : 'bg-gradient-to-br from-white to-gray-50 shadow-lg shadow-gray-200/30'
      }
    `}>
      <ResponsiveContainer width={"100%"} height={320}>
        <AreaChart 
          data={data}
          margin={{
            top: 20,
            right: 15,
            left: 10,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id='incomeGradient' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
              <stop offset={"5%"} stopColor={currentColors.primary} stopOpacity={0.4}/>
              <stop offset={"95%"} stopColor={currentColors.primary} stopOpacity={0.05}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
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
          <Area 
            type={"monotone"} 
            dataKey={"amount"} 
            stroke={currentColors.primary} 
            fill='url(#incomeGradient)' 
            strokeWidth={3} 
            dot={{ 
              r: 4, 
              fill: currentColors.primary,
              stroke: isDarkMode ? "#111827" : "#ffffff",
              strokeWidth: 2,
              filter: "url(#glow)"
            }}
            activeDot={{
              r: 6,
              fill: currentColors.primary,
              stroke: isDarkMode ? "#111827" : "#ffffff",
              strokeWidth: 2,
              style: {
                filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))'
              }
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart