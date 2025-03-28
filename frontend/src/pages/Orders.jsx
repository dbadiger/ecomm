import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {

  const {products, currency}=useContext(ShopContext)

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY '} text2={'ORDERS'}/>
      </div>
      <div className="">
        {
          products.slice(1,4).map((item, index)=>(
            <div className="py-4 border-t border-b text-gray flex flex-col md:flex-row md:itesm-center md:justify-between gap-4" key={index}>
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt="" />
                <p className='text-base font-medium'>{item.name}</p>
                <div className="flex items-center text-base mt-2 gap-3 text-gray-700">
                  <p className='text-lg'>{currency} {item.price}</p>
                  <p className=''>Quantity:1</p>
                  <p>Size: K</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>26/03/2025</span></p>
              </div>

                <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Ready to Ship</p>
                </div>
                <button className='border px-4 text-sm font-medium rounded-sm'>Track Order</button>
                </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
