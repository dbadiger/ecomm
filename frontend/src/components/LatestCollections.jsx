import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {
    const {products, navigate} = useContext(ShopContext);
    // console.log(products);
    const [latestProducts, setLatestProducts]=useState([])
    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[products])

  
    return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title text1={`🔥 LATEST`} text2={` COLLECTIONS`}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
           Step into the season with Divastra’s Latest Collection — a curated selection of contemporary fashion that blends timeless elegance with modern flair. 
           Each piece is thoughtfully designed to celebrate individuality, empower confidence, and elevate everyday style. 
           Explore the new arrivals and redefine your wardrobe with fresh silhouettes, rich textures, and bold expressions
            </p>
        </div>
      
      {/* Diplay list of products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }
        </div>
        <div className="text-center">
            <button className="w-28 py-3 mt-4 bg-[#004aad] text-white cursor-pointer" onClick={()=>navigate('/collection')}>
              SHOP NOW
            </button>
        </div>

    
    </div>
  )
}

export default LatestCollections
