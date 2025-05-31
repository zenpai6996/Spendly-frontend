import React, {useState, useContext} from 'react'
import {HiOutlineMenu, HiOutlineX, HiOutlineMenuAlt2} from "react-icons/hi";
import SideMenu from './SideMenu';
import { toggleDarkMode } from '@/App';
import { UserContext } from '@/context/userContext';
import spendlyLogo from "../../assets/images/spendlylogo.png";
import ThemeButton from '../ui/ThemeButton';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({activeMenu, isSideMenuOpen, toggleSideMenu}) => {
  const [openMobileSideMenu, setOpenMobileSideMenu] = useState(false);
  const {user, clearUser} = useContext(UserContext);

  return (
    <>
      <div className='flex items-center gap-5 bg-white dark:bg-gray-900 border-b dark:border-gray-600 border-primary py-4 px-6 sticky top-0 z-30'>
        <button 
          onClick={toggleSideMenu}
          className='hidden lg:block text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
          title={isSideMenuOpen ? 'Collapse Menu' : 'Expand Menu'}
        >
          <HiOutlineMenuAlt2 className='text-2xl'/>
        </button>

        <button 
          onClick={() => setOpenMobileSideMenu(!openMobileSideMenu)}
          className='block lg:hidden text-gray-600 cursor-pointer hover:text-gray-900'
        >
          {openMobileSideMenu ? (
            <HiOutlineX className='text-2xl text-black dark:text-gray-50'/>
          ) : (
            <HiOutlineMenu className='text-2xl text-black dark:text-gray-50'/>
          )}
        </button>
        
        <div>
          <a href="/landing">
            <img 
              src={spendlyLogo} 
              alt="Spendly Logo" 
              className='h-9 w-9 hover:scale-110 shadow-xs transition-all duration-200 ease-in-out shadow-primary rounded-xl object-contain' 
            />
          </a>
        </div>
        
        <h2 className='text-2xl font-semibold hover:text-primary dark:hover:text-primary transition-colors duration-200 ease-in-out dark:text-gray-50 text-gray-800'>
          <a href='/landing'>Spendly</a>
        </h2>
        
        <h3 className='text-gray-700 text-center hidden md:hidden lg:block pr-170 dark:text-gray-50'>
          Welcome Back <span className='font-bold text-xl text-primary'>{user?.fullName || "User"}</span>
        </h3>

        <div>
          <ThemeButton toggleDarkMode={toggleDarkMode}/>
        </div>
      </div>

     
      <AnimatePresence>
        {openMobileSideMenu && (
          <motion.div
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className='fixed top-[61px]  left-0 h-[calc(100vh-61px)] lg:hidden z-20'
          >
            <div className='bg-white dark:bg-gray-900 w-64 h-full border-r dark:border-gray-600'>
              <SideMenu 
                activeMenu={activeMenu} 
                isOpen={true}
                isMobile={true}
                closeMobileMenu={() => setOpenMobileSideMenu(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar