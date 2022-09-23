import React from 'react'

const Footer:React.FC = () => {
  return(
    <div className='footer h-20 fixed bottom-0 w-full items-center flex'>
      <div className='flex justify-center container mx-auto items-end gap-2'>
        <p className='text-3xl'>Donation</p>
        <p className='text-base text-gray-400'>© 2022 All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
