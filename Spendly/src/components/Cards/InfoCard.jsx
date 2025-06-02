import React from 'react'
import { CountingNumber } from '../animate-ui/text/counting-number'
import { motion } from 'framer-motion'

const InfoCard = ({icon, label, value, color}) => {
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
    <motion.div 
      variants={containerVariants}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl shadow-sm
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        hover:shadow-md hover:-translate-y-1 
        transition-all duration-300 ease-in-out
        cursor-pointer
        hover:shadow-primary/30 dark:hover:shadow-primary/50
        hover:border-primary/50 dark:hover:border-primary"
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl sm:text-[26px] text-white ${color} rounded-full shadow-md`}>
        {icon}
      </div>
      <motion.div variants={itemVariants} className="flex-1">
        <h6 className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </h6>
        <span className="text-lg sm:text-[22px] font-medium text-gray-800 dark:text-gray-100">
          ₹ <CountingNumber number={parseInt(value.replace(/,/g, '')) || 0} className="inline-block" />
        </span>
      </motion.div>
    </motion.div>
  )
}

export default InfoCard