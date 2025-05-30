import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '@/utils/data'
import { UserContext } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { motion } from 'framer-motion'

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout"){
      handleLogout();
      return;
    }
    navigate(route);
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


  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white rounded-tr-xl border-r dark:bg-gray-900 border-primary dark:border-gray-600 p-5 sticky top-[64px] z-20'>
      <div   
        
        className='flex flex-col gap-6'
        >
        <div className='flex flex-col items-center justify-center mt-3 gap-3 mb-1'>
          {user?.profileImageUrl ? (
            <img 
              src={user?.profileImageUrl}
              alt="Profile Image"
              className='w-20 h-20 border-2  border-primary  rounded-full bg-slate-400 object-cover'
            />
          ):(
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          <motion.h5 variants={itemVariants} className='text-gray-900 dark:text-gray-100 font-medium text-lg'>
            {user?.fullName || ""}
          </motion.h5>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial='hidden'
          animate='visible' 
          className='flex flex-col gap-1'>
          {SIDE_MENU_DATA.map((item, index) => (
            <motion.button
              key={`menu_${index}`}
              variants={itemVariants}
              className={`w-full flex cursor-pointer items-center gap-3 text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                activeMenu === item.label 
                  ? 'bg-primary text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 hover:dark:bg-gray-700'
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-lg" />
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default SideMenu