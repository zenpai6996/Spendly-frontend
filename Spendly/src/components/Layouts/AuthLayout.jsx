import React, { useState, useEffect } from 'react'
import card from "../../assets/images/card2.png"
import {     
  LuWallet,          
  LuPiggyBank,              
  LuDollarSign,     
  LuArrowUpDown,     
  LuCircleDollarSign, 
  LuTrendingUp,      
  LuCreditCard,             
} from "react-icons/lu";

const luIcons = [
  LuWallet,
  LuPiggyBank,
  LuDollarSign,
  LuArrowUpDown,
  LuCircleDollarSign,
  LuTrendingUp,
  LuCreditCard
];

const AuthLayout = ({children}) => {
  const [randomValue, setRandomValue] = useState(0);
  const [RandomIcon, setRandomIcon] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * luIcons.length);
    setRandomIcon(() => luIcons[randomIndex]);
  }, []);
  
  useEffect(() => {
    const min = 100000;
    const max = 500000;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomValue(randomNum.toLocaleString()); 
  }, []);

  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-6 sm:px-8 md:px-12 pt-8 pb-12'>
        <h2 className='text-4xl font-extrabold bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] text-center md:text-left'>
          Spendly
        </h2>
        {children}
      </div>
      <div className='hidden md:block w-[60vw] h-screen bg-green-200 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-green-600 absolute -top-26 -left-5'/>
        <div className='w-48 h-48 border-[20px] rounded-[40px] border-green-800 absolute top-[60%] left-140'/>
        <div className='w-48 h-48 rounded-[40px] bg-green-500 absolute -bottom-10 -left-15'/>

        <div className='grid grid-cols-1 z-20 cursor-pointer'>
          <StatsInfoCard
            icon={RandomIcon ? <RandomIcon /> : null}
            label="Track you Income and Expenses"
            value={randomValue}
            colors="bg-primary"
          />
        </div>

        <img 
          src={card} 
          className='w-64 lg:w-[70%] absolute bottom-5 right-20'
        />
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    <>
      <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-green-400 border boder-gray-200/50 z-10 transition-all duration-300 ease-in-out 
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 hover:border-green-300'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white bg-primary rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        <div>
          <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
          <span className='text-[20px]'>$ {value}</span>
        </div>
      </div>
    </>
  );
}