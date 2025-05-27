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

const Income = () => {

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
      toast.info("Income details deleted succesfully");
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

  };

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
      
    }
  }, []);
  

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
          </div>
          <IncomeList 
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show:true , data:id})
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div dark:text-white text-gray-200>
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </div>
        </Modal>
        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false ,data:null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income ?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
      </DashboardLayout>
  )
}

export default Income