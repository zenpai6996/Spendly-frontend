import React ,{useState,useEffect}from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { useUserAuth } from '@/hooks/useUserAuth'
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import ExpenseOverview from '@/components/Expense/ExpenseOverview';
import Modal from '@/components/Modal';
import AddExpenseForm from '@/components/inputs/AddExpenseForm';
import { toast } from 'sonner';
import ExpenseList from '@/components/Expense/ExpenseList';
import DeleteAlert from '@/components/DeleteAlert';

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

    //? Handle delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show:false,data:null});
      toast.info("Expense detail deleted succesfully");
      fetchExpenseDetails();

    }catch(error){
        console.log("Error deleting Expense details",error.response?.data?.message || error.message);
        toast.error("Error deleting expense details",{
          description:error.response?.data?.message || error.message
        })
    }
  };

  //? Handle expense download
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
        responseType:"blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.info("Downloading Expense Details !!");


    }catch(error){
      console.error("Error downloading expenses",error);
      toast.error("Failed to download Expense details",{
        description:"Please try again later."
      });
    }
  };

  useEffect(() => {
    fetchExpenseDetails()
  
    return () => {}
  }, []);
  

  return (
   <DashboardLayout activeMenu={"Expense"}>
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            Expense Management
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-sm sm:text-base'>
            Track and manage your expenses efficiently
          </p>
        </div>

       
        <div className='flex flex-col xl:grid-cols-12 gap-6 lg:gap-8'>
          <div className='xl:col-span-8'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
              <ExpenseList 
                transactions={expenseData}
                onDelete={(id) => {
                  setOpenDeleteAlert({show:true , data:id});
                }}
                onDownload={handleDownloadExpenseDetails}
              />
            </div>
          </div>
          
          <div className='xl:col-span-4'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
              <ExpenseOverview
                transactions={expenseData}
                onExpenseIncome={() => setOpenAddExpenseModal(true)}
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center z-40'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center space-x-3'>
                <div className='animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent'></div>
                <span className='text-gray-700 dark:text-gray-300 font-medium'>Fetching Expenses data...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={OpenAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add New Expense"
      >
        <div className='p-1'>
          <div className='text-gray-700 dark:text-gray-200 space-y-4'>
            <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              Fill in the details to add a new expense entry
            </div>
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show:false ,data:null})}
        title="Confirm Deletion"
      >
        <div className='p-1'>
          <DeleteAlert
            content="Are you sure you want to delete this expense? This action cannot be undone."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </div>
   </DashboardLayout>
  )
}

export default Expenses