import React from 'react'

const NewsLetter = () => {

  const onSubmitHandler = (event)=>{
    event.prevent.default();
  }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Join the Divastra circle and enjoy 25% off your first purchase.</p>
        <p className="text-gray-400 mt-3">
          Be the first to discover new collections, exclusive offers, style tips, and more — straight to your inbox. Your fashion journey starts here.

        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input type="email"
          placeholder='Enter your Email' 
          required
          className='w-full sm:flex-1 outline-none'/>
          <button type='submit' className='bg-[#004aad] text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter
