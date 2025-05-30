import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '@/utils/data'
import { UserContext } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX } from 'react-icons/hi'

const SideMenu = ({activeMenu, isOpen = true, isMobile = false, closeMobileMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout"){
      handleLogout();
      return;
    }
    navigate(route);
    
   
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  }

  const containerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const sideMenuVariants = {
    open: {
      width: 256,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    closed: {
      width: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (!isOpen && !isMobile) {
    return null;
  }

  return (
    <motion.div 
      variants={sideMenuVariants}
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      className={`${
        isMobile 
          ? 'w-64 h-full ' 
          : 'w-64 h-full sticky top-[1px] rounded-tr-xl'
      } bg-white border-r dark:bg-gray-900 border-primary dark:border-gray-600 p-5 z-20 overflow-hidden`}
    >
      <div className='flex flex-col gap-6 h-full'>
       
      

        
        <div className='flex flex-col items-center justify-center mt-3 gap-3 mb-1'>
          {user?.profileImageUrl ? (
            <img 
              src={user?.profileImageUrl}
              alt="Profile Image"
              className='w-20 h-20 border-2 border-primary rounded-full bg-slate-400 object-cover'
            />
          ):(
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          <motion.h5 
            variants={itemVariants} 
            className='text-gray-900 dark:text-gray-100 font-medium text-lg text-center'
          >
            {user?.fullName || ""}
          </motion.h5>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial='hidden'
          animate='visible' 
          className='flex flex-col gap-1 flex-1'
        >
          {SIDE_MENU_DATA.map((item, index) => (
            <motion.button
              key={`menu_${index}`}
              variants={itemVariants}
              className={`w-full flex cursor-pointer items-center gap-3 text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                activeMenu === item.label 
                  ? 'bg-primary text-gray-900 dark:text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 hover:dark:bg-gray-700'
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-lg flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        <div className='text-xs text-gray-500 dark:text-gray-400 text-center border-t pt-3 dark:border-gray-700'>
          Spendly v1.0
        </div>
      </div>
    </motion.div>
  )
}

export default SideMenu