import React, {useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex items-center gap-5 bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30'>
      <button 
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className='block lg:hidden text-gray-600 hover:text-gray-900'
      >
        {openSideMenu ? (
          <HiOutlineX className='text-2xl'/>
        ) : (
          <HiOutlineMenu className='text-2xl'/>
        )}
      </button>
      <h2 className='text-xl font-semibold text-gray-800'>
        <a href='/dashboard'>Spendly</a>
      </h2>
      
      {openSideMenu && (
        <div className='fixed top-[62px] left-0 h-full lg:hidden z-20'>
          <div className='bg-white w-64 h-full'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar