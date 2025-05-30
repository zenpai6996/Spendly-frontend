import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/70 dark:bg-black/50'
      onClick={onClose}
    >
      <div 
        className='relative p-4 w-full max-w-2xl max-h-full'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='relative bg-gray-100 dark:bg-gray-800 rounded-lg shadow '> 
         
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
              {title}
            </h3>
            <button
              type='button'
              className='text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-200 dark:hover:text-gray-900'
              onClick={onClose}
              aria-label='Close modal'
            >
              <svg 
                className='w-5 h-5'
                aria-hidden='true'
                xmlns="http://www.w3.org/2000/svg"
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
            </button>
          </div>

          
          <div className='p-4 md:p-5 space-y-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;