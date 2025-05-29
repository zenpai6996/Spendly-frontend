import React from 'react'
import { CountingNumber } from '../animate-ui/text/counting-number'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex gap-6 hover:translate-y-[-5px] cursor-pointer transition-all duration-300 ease-linear bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md shadow-gray-300 hover:shadow-primary  dark:shadow-primary dark:hover:shadow-white dark:hover:border-white border border-primary/50'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-700 dark:text-gray-300 mb-1'>
          {label}
        </h6>
        <span className='text-[22px] text-gray-800 dark:text-gray-200'>
          ₹ <CountingNumber number={parseInt(value.replace(/,/g, '')) || 0} className="inline-block" />
        </span>
      </div>
    </div>
  )
}

export default InfoCard