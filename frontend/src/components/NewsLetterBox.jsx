import React from 'react'

const NewsLetter = () => {

  const onSubmitHandler = (event)=>{
    event.prevent.default();
  }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 25% Off</p>
        <p className="text-gray-400 mt-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem assumenda delectus quod. Quam aliquam sint quas deserunt vero voluptatum nesciunt exercitationem, quod pariatur aspernatur error ducimus, provident tenetur similique.

        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input type="email"
          placeholder='Enter your Email' 
          required
          className='w-full sm:flex-1 outline-none'/>
          <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter
