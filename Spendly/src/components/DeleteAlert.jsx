import React from 'react'
import {  LuTrash2 } from 'react-icons/lu'

const DeleteAlert = ({content , onDelete}) => {
  return (
    <div>
      <p className='text-sm'>
        {content}
      </p>
      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={onDelete}
        >
          <LuTrash2 size={25}/>
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert