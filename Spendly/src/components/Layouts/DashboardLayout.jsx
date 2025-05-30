import { UserContext } from '@/context/userContext'
import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { motion } from 'framer-motion';

const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <motion.div  
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }} 
      className='min-h-screen bg-gray-100  dark:bg-[#07101c]'>
      <Navbar 
        activeMenu={activeMenu}
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
      
      {user && (
        <div className='flex ml-5'>
          
          {!isMobile && (
            <motion.div
              initial={{ width: isSideMenuOpen ? 256 : 0 }}
              animate={{ width: isSideMenuOpen ? 256 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='overflow-hidden mr-5 '
            >
              <SideMenu 
                activeMenu={activeMenu}
                isOpen={isSideMenuOpen}
              />
            </motion.div>
          )}
          
          <motion.div 
            initial={{ marginLeft: 0 }}
            animate={{ marginLeft: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='flex-1 mx-5'
          >
            {children}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default DashboardLayout