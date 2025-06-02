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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
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

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {[1,2,3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8"
        >
          <motion.div 
            variants={cardVariants}
            className="text-center lg:text-left"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Dashboard 
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Track your financial progress and recent activities
            </p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <motion.div 
                variants={gridVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
              >
                <motion.div variants={cardVariants}>
                  <InfoCard 
                    icon={<Landmark className="w-5 h-5 sm:w-6 sm:h-6" />}
                    label="Total Balance"
                    value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                    color="bg-gradient-to-r from-yellow-400 to-yellow-600"
                    className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  /> 
                </motion.div>
                <motion.div variants={cardVariants}>
                  <InfoCard
                    icon={<Wallet className="w-5 h-5 sm:w-6 sm:h-6" />}
                    label="Total Income"
                    value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                    color="bg-gradient-to-r from-green-400 to-green-600"
                    className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  /> 
                </motion.div>
                <motion.div variants={cardVariants}>
                  <InfoCard
                    icon={<Coins className="w-5 h-5 sm:w-6 sm:h-6" />}
                    label="Total Expense"
                    value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                    color="bg-gradient-to-r from-red-400 to-red-600"
                    className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  /> 
                </motion.div>
              </motion.div>

              <motion.div 
                variants={gridVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
              >
                <motion.div 
                  variants={cardVariants}
                  className="order-1 lg:order-1"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <RecentTransactions
                      transactions={dashboardData?.recentTransactions}
                      onSeeMore={() => navigate("/expense")}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="order-2 lg:order-2"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <RecentIncome
                      transactions={dashboardData?.last60DaysIncome?.transaction || []}
                      onSeeMore={() => navigate("/income")}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="order-3 lg:order-3"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <FinanceOverview
                      totalBalance={dashboardData?.totalBalance || 0}
                      totalIncome={dashboardData?.totalIncome || 0}
                      totalExpense={dashboardData?.totalExpense || 0}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="order-4 lg:order-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <RecentIncomeWithChart
                      data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
                      totalIncome={dashboardData?.totalIncome || 0}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="order-5 lg:order-5"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <ExpenseTransactions
                      transactions={dashboardData?.last30DaysExpenses?.transaction || []}
                      onSeeMore={() => navigate("/expense")}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="order-6 lg:order-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <Last30DaysExpenses
                      data={dashboardData?.last30DaysExpenses?.transaction || []}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}

        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard