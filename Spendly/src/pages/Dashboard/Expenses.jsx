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
    <div className='my-5 mx-auto'>
    <div className='grid grid-cols-1 gap-6'>
      <div className=''>
        <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />
      </div>
      <ExpenseList 
        transactions={expenseData}
        onDelete={(id) => {
          setOpenDeleteAlert({show:true , data:id});
        }}
        onDownload={handleDownloadExpenseDetails}
      />
    </div>
     <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <div dark:text-white text-gray-200>
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </div>
        </Modal>
        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false ,data:null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
    </div>
   </DashboardLayout>
  )
}

export default Expenses