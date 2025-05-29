import { UserContext } from '@/context/userContext'
import React, {  useContext } from 'react'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children,activeMenu}) => {
  
  const {user} = useContext(UserContext);

  


  return (
    <div className='min-h-screen bg-gray-100 dark:bg-[#07101c] '>
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
    </div>
  )
}

export default DashboardLayout