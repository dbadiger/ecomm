import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className=''>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
           <Link to="/"> <img src={assets.divastra_logo} className='mb-5 w-32' alt="" /></Link>
            <p className='w-full md:w-2/3 text-gray-600'>Find Best Clothing Collection.</p>

        </div>
        <div className="">
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
               <Link to="/"> <li>HOME</li></Link>
               <Link to="/about"> <li>ABOUT US</li></Link>
               <Link to="/cart"> <li>CART</li></Link>
               <Link to="/collection"> <li>COLLECTIONS</li></Link>
            </ul>
        </div>
        <div className="">
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 789898 78562</li>
                <li>contact@divastra.com</li>
                <li>Privcy Policy</li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@Divastra.com - All Rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
