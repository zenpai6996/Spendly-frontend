import React from 'react'
import {
  LuUtensils,
  LuTrendingDown,
  LuTrendingUp,
  LuTrash2
} from "react-icons/lu"

const TransactionInfoCard = ({
            title,
            icon,
            date,
            amount,
            type,
            hideDeleteBtn,
            onDelete
          }) => {

            const getAmountStyles = () => 
              type === "income" ? "bg-green-50 dark:bg-green-100 text-green-500" : "bg-red-50 dark:bg-red-100 text-red-500";
            

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-600/60  cursor-pointer'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 dark:bg-gray-500 rounded-full'>
        {icon ? (
          <img src={icon} alt={title} className='w-6 h-6'/>
        ):(
          <LuUtensils className="text-gray-600 dark:text-gray-300"/>
        )}
      </div>
      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 dark:text-gray-300 font-medium'>
            {title}
          </p>
          <p className='text-xs text-gray-400  mt-1'>
            {date}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
          <button onClick={onDelete} className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
            <LuTrash2 size={18}/>
          </button>
        ) }
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
          <h6 className='text-xs font-medium'>
            {type === "income" ? "+" : "-"} ₹ {amount}
          </h6>
          {type === "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
        </div>
        </div>
      </div>
    </div>
    
  )
}

export default TransactionInfoCard