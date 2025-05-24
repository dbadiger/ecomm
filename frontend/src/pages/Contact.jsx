import React, { useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetterBox'
import { ShopContext } from '../context/ShopContext'

const Contact = () => {
  const {navigate} = useContext(ShopContext)
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={' US'}/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'> Our Store</p>
          <p className='text-gray-500'>Divastra Clothing Collections<br/>2nd Floor, Shrinivas Enclave, Vidyanagar Hubli</p>
          <p className='text-gray-500'>Tel: +91 8197745652<br/>Email: contact@divastra.in</p>
          <p className='font-semibold text-xl text-gray-600'>Collections</p>
          <p className='text-gray-500'>Explore Our Collections</p>
          <button 
          onClick={()=>navigate("/collection")}
          className='border border-black px-8 py-4 text-sm hover:bg-[#004aad] hover:text-white transition-all duration-500'>Order Now</button>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default Contact
