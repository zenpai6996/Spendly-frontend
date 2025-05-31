import React from 'react'
import {
  LuUtensils,
  LuTrendingDown,
  LuTrendingUp,
  LuTrash2,
  LuFileSearch
} from "react-icons/lu"

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  isEmpty 
}) => {
  const getAmountStyles = () => 
    type === "income" 
      ? "bg-green-50 dark:bg-green-100 text-green-500" 
      : "bg-red-50 dark:bg-red-100 text-red-500";

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
          <LuFileSearch className="w-8 h-8 text-green-400 dark:text-green-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          {type === "income"
            ? "No Income Found"
            : "No Expense Found"
          }
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {type === "income" 
            ? "You haven't recorded any income yet" 
            : "You haven't recorded any expenses yet"}
        </p>
        <p className="text-xs mt-1 text-primary">
          {type === "income"
           ? <a href='/income'>Add Income</a>
           : <a href='/expense'>Add Expense</a>
          }
        </p>
      </div>
    );
  }

  return (
    <div className='group relative flex items-center gap-3 sm:gap-4 mt-2 p-2 sm:p-3 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-600/60 cursor-pointer'>
      <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl text-gray-800 bg-gray-100 dark:bg-gray-500 rounded-full flex-shrink-0'>
        {icon ? (
          <img src={icon} alt={title} className='w-5 h-5 sm:w-6 sm:h-6'/>
        ):(
          <LuUtensils className="text-gray-600 dark:text-gray-300"/>
        )}
      </div>

      <div className='flex-1 flex flex-row sm:flex-row sm:items-center justify-between gap-2 sm:gap-1 overflow-hidden'>
        <div className='min-w-0'>
          <p className='text-sm sm:text-xs text-gray-700 dark:text-gray-300 font-medium truncate'>
            {title}
          </p>
          <p className='text-[10px] sm:text-xs text-gray-400'>
            {date}
          </p>
        </div>

        <div className='flex items-center justify-end sm:justify-between gap-1 sm:gap-2'>
          {!hideDeleteBtn && (
            <button 
              onClick={onDelete} 
              className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1'
            >
              <LuTrash2 size={16} className="sm:w-4 sm:h-4"/>
            </button>
          )}
          
          <div className={`flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className='text-xs font-medium whitespace-nowrap'>
              {type === "income" ? "+" : "-"} ₹{amount}
            </h6>
            {type === "income" ? (
              <LuTrendingUp className="w-3 h-3 sm:w-4 sm:h-4"/>
            ) : (
              <LuTrendingDown className="w-3 h-3 sm:w-4 sm:h-4"/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard