import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '@/utils/data'
import { UserContext } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'

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

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center justify-center mt-3 gap-3 mb-7'>
          {user?.profileImageUrl ? (
            <img 
              src={user?.profileImageUrl}
              alt="Profile Image"
              className='w-20 h-20 rounded-full bg-slate-400 object-cover'
            />
          ):(
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          <h5 className='text-gray-950 font-medium text-lg'>
            {user?.fullName || ""}
          </h5>
        </div>
        
        <div className='flex flex-col gap-1'>
          {SIDE_MENU_DATA.map((item, index) => (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-3 text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                activeMenu === item.label 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideMenu