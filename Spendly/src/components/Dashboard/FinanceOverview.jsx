import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';


const COLORS = ["#eab308","#22c55e","#ef4444"];

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
  
  const balanceData = [
    {name: "Total Balance", amount:totalBalance},
    {name: "Total Income", amount:totalIncome},
    {name: "Total Expense", amount:totalExpense},
  ];
  
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
      <h5 className='text-lg dark:text-primary '>Financial Overview</h5>
    </div>
    <div className='mt-5'>
      <CustomPieChart
      data={balanceData}
      label="Total Balance"
      totalAmount={`₹ ${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />
    </div>
    </div>
  );
}

export default FinanceOverview