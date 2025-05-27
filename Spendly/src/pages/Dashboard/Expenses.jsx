import React ,{useState,useEffect}from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { useUserAuth } from '@/hooks/useUserAuth'
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import ExpenseOverview from '@/components/Expense/ExpenseOverview';

const Expenses = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show:false,
      data:null
    });

    //? Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return ; //! Add a loader animation
    
    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("Something went Wrong. Please try again",error);
      toast.error("Failed to fetch expense data ❌",{
        description:"Please try again later"
      })
    }finally{
      setLoading(false);
    }
  };

  //? Handle Add Expense
  const handleAddExpense = async (expense) => {
    const {category , amount , date ,icon} = expense;

    //? validate checks
     if(!icon){
      toast.error("All fields are required");
      return;
    }

    if(!category.trim()){
      toast.error("Expense category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Enter a valid amount greater than 0");
      return;
    }

    if(!date){
      toast.error("Please enter the date");
      return;
    }

   

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added Succesfully");
      fetchExpenseDetails();
    }catch(error){
      console.log("Error Adding response", error.response?.data?.message || error.message);
      toast.error("Error Adding Expense",{
        description:error.response?.data?.message || error.message
      })
    }
  };

  useEffect(() => {
    fetchExpenseDetails()
  
    return () => {}
  }, []);
  

  return (
   <DashboardLayout activeMenu={"Expense"}>
    <div className='my-5 mx-auto'>
    <div className='grid grid-cols-1 gap-6'>
      <div className=''>
        <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />
      </div>
    </div>
    </div>
   </DashboardLayout>
  )
}

export default Expenses