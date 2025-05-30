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
  return (
    <ResponsiveContainer width="100%" height={415}>
      <PieChart>
        {showTextAnchor && (
          <text 
            x="50%"
            y="30%"
            textAnchor="middle"
            dominantBaseline="middle"
            className='text-[#666] dark:text-gray-100 '
            fill='#666'
            fontSize="14px"
          >
            {label}
            <tspan x="50%" dy="30" fill="#666" fontSize="18px" fontWeight="500">
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
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          stroke="#fff"
          strokeWidth={1}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>}/>
        <Legend content={<CustomLegend/>}/>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart