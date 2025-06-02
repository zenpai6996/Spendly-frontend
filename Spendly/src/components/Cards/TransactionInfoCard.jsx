import React from 'react'
import {
  LuMousePointer,
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
      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
      : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <LuFileSearch className="w-8 h-8 text-green-500 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
          {type === "income"
            ? "No Income Found"
            : "No Expense Found"
          }
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {type === "income" 
            ? "You haven't recorded any income yet" 
            : "You haven't recorded any expenses yet"}
        </p>
        <p className="text-xs mt-2 text-primary-600 dark:text-primary-400 hover:underline">
          {type === "income"
           ? <a href='/income'>Add Income</a>
           : <a href='/expense'>Add Expense</a>
          }
        </p>
      </div>
    );
  }

  return (
    <div className='group relative flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-200 m-1 cursor-pointer'>
      <div className='w-10 h-10 flex items-center justify-center text-lg text-gray-700 dark:text-gray-300  bg-gray-100 dark:bg-gray-700 rounded-full flex-shrink-0'>
        {icon ? (
          <img src={icon} alt={title} className='w-5 h-5 object-contain'/>
        ):(
          <LuMousePointer className="text-gray-600 dark:text-gray-300"/>
        )}
      </div>

      <div className='flex-1 flex items-center justify-between gap-2 overflow-hidden min-w-0'>
        <div className='min-w-0'>
          <p className='text-sm font-medium text-gray-800 dark:text-gray-200 truncate'>
            {title}
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            {date}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <button 
              onClick={onDelete} 
              className='text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1'
              aria-label="Delete transaction"
            >
              <LuTrash2 size={16} />
            </button>
          )}
          
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <span className='text-xs font-medium whitespace-nowrap'>
              {type === "income" ? "+" : "-"} ₹{amount}
            </span>
            {type === "income" ? (
              <LuTrendingUp className="w-3.5 h-3.5" />
            ) : (
              <LuTrendingDown className="w-3.5 h-3.5" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard