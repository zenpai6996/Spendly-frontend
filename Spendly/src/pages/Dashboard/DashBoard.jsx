import React,{useState,useEffect} from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { useUserAuth } from '@/hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { toast } from 'sonner';
import InfoCard from '@/components/Cards/InfoCard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { Landmark ,Wallet,Coins} from 'lucide-react';
import { addThousandsSeparator } from '@/utils/helper';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import FinanceOverview from '@/components/Dashboard/FinanceOverview';
import ExpenseTransactions from '@/components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '@/components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '@/components/Income/RecentIncomeWithChart';
import RecentIncome from '@/components/Dashboard/RecentIncome';
import { motion } from 'framer-motion';




const Dashboard = () => {

  
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

  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data){
        setDashboardData(response.data);
      }
    }catch(error){
      console.log("Something Went Wrong. Please Try Again",error);
      toast.error("Something went Wrong ❌.",{
        description:"Please try again"
      })
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  
    return () => {}
  }, []);
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <motion.div variants={containerVariants} className='my-5 ml-5 '>
        <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard 
              icon={<Landmark />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-yellow-500"
          /> 
          <InfoCard
              icon={<Wallet/>}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-500"
          /> 
          <InfoCard
              icon={<Coins/>}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-400"
          /> 
        </motion.div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transaction || []}
          onSeeMore={() => navigate("/income")}
         />
         <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
          totalIncome={dashboardData?.totalIncome || 0}

         />
          
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transaction || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transaction || []}
         />
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default Dashboard