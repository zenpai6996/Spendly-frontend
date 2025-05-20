import React from 'react'
import card from "../../assets/images/card-Photoroom.png"

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>
          Spendly
        </h2>
        {children}
      </div>
      <div className=''>
        <div className=''/>
        <div className=''/>
        <div className=''/>

        <img 
          src={card} 
          className=''
        />
      </div>
    </div>
  )
}

export default AuthLayout