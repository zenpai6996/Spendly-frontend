import CustomPieChart from '@/components/Charts/CustomPieChart'
import React,{useEffect, useState} from 'react'

const COLORS = ["#72CD16","#FA2C37","#FF6900","#4f39f6"];

const RecentIncomeWithChart = ({data,totalIncome}) => {
  
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount:item?.amount
    }));
    setChartData(dataArr);
  }

  useEffect(() => {
    prepareChartData()
  
    return () => {}
  }, [data]);
  

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg dark:text-primary'>Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label={"Total Income"}
        totalAmount={`₹ ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart