import { UserContext } from '@/context/userContext'
import React, {  useContext } from 'react'
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { motion } from 'framer-motion';

const DashboardLayout = ({children,activeMenu}) => {
  
  const {user} = useContext(UserContext);

  


  return (
    <motion.div  
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }} 
      className='min-h-screen bg-gray-100 dark:bg-[#07101c] '>
      <Navbar activeMenu={activeMenu}/>
      
      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
          <div className='grow mx-5'>
            {children}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default DashboardLayout