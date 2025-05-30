import React from 'react'
import { CountingNumber } from '../animate-ui/text/counting-number'
import { motion } from 'framer-motion'

const InfoCard = ({icon,label,value,color}) => {

  const containerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div variants={containerVariants} className='flex gap-6 hover:translate-y-[-5px] cursor-pointer transition-all duration-300 ease-linear bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md shadow-gray-300 hover:shadow-primary  dark:shadow-primary dark:hover:shadow-white dark:hover:border-white border border-primary/50'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <motion.div variants={itemVariants}>
        <h6 className='text-sm text-gray-700 dark:text-gray-300 mb-1'>
          {label}
        </h6>
        <span className='text-[22px] text-gray-800 dark:text-gray-200'>
          ₹ <CountingNumber number={parseInt(value.replace(/,/g, '')) || 0} className="inline-block" />
        </span>
      </motion.div>
    </motion.div>
  )
}

export default InfoCard