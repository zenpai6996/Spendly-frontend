import React,{useEffect, useState} from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import IncomeOverview from '@/components/Income/IncomeOverview'
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { toast } from 'sonner';
import Modal from '@/components/Modal';
import AddIncomeForm from '@/components/inputs/AddIncomeForm';
import IncomeList from '@/components/Income/IncomeList';
import DeleteAlert from '@/components/DeleteAlert';
import { useUserAuth } from '@/hooks/useUserAuth';

const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null
  });

  //? Get All income Details
  const fetchIncomeDetails = async () => {
    if (loading) return ; //! Add a loader animation
    
    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console.log("Something went Wrong. Please try again",error);
      toast.error("Failed to fetch income data ❌",{
        description:"Please try again later"
      })
    }finally{
      setLoading(false);
    }
  };

  //? Handle Add Income
  const handleAddIncome = async (income) => {
    const {source,amount , date,icon} =income;

    //? validate checks
     if(!icon){
      toast.error("All fields are required");
      return;
    }

    if(!source.trim()){
      toast.error("Income source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added Succesfully");
      fetchIncomeDetails();
    }catch(error){
      console.log("Error Adding response", error.response?.data?.message || error.message);
      toast.error("Error Adding Income",{
        description:error.response?.data?.message || error.message
      })
    }
  };

  //? Handle delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show:false,data:null});
      toast.info("Income detail deleted succesfully");
      fetchIncomeDetails();

    }catch(error){
        console.log("Error deleting income details",error.response?.data?.message || error.message);
        toast.error("Error deleting income details",{
          description:error.response?.data?.message || error.message
        })
    }
  };

  //? Handle download income excel
  const handleDownloadIncomeDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
        responseType:"blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.info("Downloading Income Details !!");

    }catch(error){
      console.error("Error downloading income",error);
      toast.error("Failed to download Income details",{
        description:"Please try again later."
      });
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
      
    }
  }, []);
  

  return (
    <DashboardLayout activeMenu="Income">
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Income Management
            </h1>
            <p className='text-gray-600 dark:text-gray-400 text-sm sm:text-base'>
              Track and manage your income sources effectively
            </p>
          </div>

          <div className='flex flex-col xl:grid-cols-12 gap-6 lg:gap-8'>
            <div className='xl:col-span-8'>
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
                <IncomeList 
                  transactions={incomeData}
                  onDelete={(id) => {
                    setOpenDeleteAlert({show:true , data:id})
                  }}
                  onDownload={handleDownloadIncomeDetails}
                />
              </div>
            </div>
            
            <div className='xl:col-span-4'>
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
                <IncomeOverview
                  transactions={incomeData}
                  onAddIncome={() => setOpenAddIncomeModal(true)}
                />
              </div>
            </div>
          </div>

          {loading && (
            <div className='fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center z-40'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-3'>
                  <div className='animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent'></div>
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>Fetching income data...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <div className='p-1'>
            <div className='text-gray-700 dark:text-gray-200 space-y-4'>
              <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                Fill in the details to add a new income entry
              </div>
              <AddIncomeForm onAddIncome={handleAddIncome}/>
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
              content="Are you sure you want to delete this income entry? This action cannot be undone."
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income