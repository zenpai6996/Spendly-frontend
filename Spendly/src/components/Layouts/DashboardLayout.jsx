import { UserContext } from '@/context/userContext'
import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
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
      className='min-h-screen bg-gray-100 dark:bg-[#07101c] relative'>
      <Navbar 
        activeMenu={activeMenu}
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
        isMobile={isMobile}
      />
      
      {user && (
        <div className='relative flex'>
          <AnimatePresence>
            {isMobile && isSideMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20"
                onClick={() => setIsSideMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSideMenuOpen && (
              <motion.div
                initial={{ x: isMobile ? -300 : 0 }}
                animate={{ x: 0 }}
                exit={{ x: isMobile ? -300 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-[70px] -left-0.5 h-[calc(100vh-77px)] z-30 w-64`}
              >
                <SideMenu 
                  activeMenu={activeMenu}
                  isOpen={isSideMenuOpen}
                  isMobile={isMobile}
                  closeMobileMenu={() => setIsSideMenuOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            initial={{ marginLeft: 0 }}
            animate={{ 
              marginLeft: isSideMenuOpen && !isMobile ? 256 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex-1 min-h-[calc(100vh-77px)] transition-all duration-300 ${
              isMobile ? 'px-4' : 'mx-5'
            }`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default DashboardLayout