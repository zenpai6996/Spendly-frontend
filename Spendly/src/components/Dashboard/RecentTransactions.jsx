import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

//TODO: Create empty states for recent transactions if theres no data to fetch
//TODO: Create Skeleton pages

const RecentTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg  dark:text-primary dark:text-gray-300'>
             Transactions
        </h5>
        <button className='card-btn' onClick={onSeeMore}>
            See All <LuArrowRight className='text-base inline-block hover:translate-x-1 transition-[transform] duration-300 ease-in-out'/>
        </button>
      </div>
      <div className='mt-6'>
         {transactions?.length > 0 ? (
          transactions.slice(0,5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <TransactionInfoCard 
            isEmpty={true}
            type="expense"
          />
        )}
      </div>
    </div>
  )
}

export default RecentTransactions