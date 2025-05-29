import React, {useState,useContext} from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';
import { toggleDarkMode } from '@/App';
import { UserContext } from '@/context/userContext';

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const {user, clearUser} = useContext(UserContext);



  return (
    <div className='flex  items-center gap-5 bg-white
    dark:bg-gray-900 border-b dark:border-gray-600 border-primary  py-4 px-6 sticky top-0 z-30'>
      <button 
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className='block lg:hidden text-gray-600 cursor-pointer hover:text-gray-900'
      >
        {openSideMenu ? (
          <HiOutlineX className='text-2xl text-black dark:text-gray-50 '/>
        ) : (
          <HiOutlineMenu className='text-2xl text-black dark:text-gray-50'/>
        )}
      </button>
      <h2 className='text-2xl font-semibold hover:text-primary dark:hover:text-primary
      transition-colors duration-200 ease-in-out dark:text-gray-50 text-gray-800'>
        <a href='/dashboard'>Spendly</a>
      </h2>
      
      <button onClick={toggleDarkMode} className="p-1 text-sm rounded bg-gray-700 dark:bg-gray-200 text-white dark:text-black">
      Toggle Dark Mode
      </button>
      <h3 className='text-gray-700 text-center dark:text-gray-50'> Welcome Back <span className='font-bold text-xl text-primary'> {user?.fullName || "User"} </span> </h3>

      
      {openSideMenu && (
        <div className='fixed top-[48px] left-0 h-full lg:hidden z-20'>
          <div className='bg-white dark:bg-gray-900 w-64 h-full'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar