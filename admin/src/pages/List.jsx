import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list-products"
      );
      // console.log(response.data);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backendUrl+"/api/product/remove", {id},{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)      
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div>
          <div className='inline-flex gap-2 items-center mb-3'>
          <h2 className='text-[#004aad] font-semibold text-3xl font-outfit'>ALL <span className='text-gray-700 font-medium'>PRODUCTS</span></h2>
          <p className='w-8 sm:w-12 h-[1px] bg-gray-700'></p>
        </div>
        <div className="flexx flex-col gap-2">
          {/* List Table title */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-2 px-2 rounded-sm bg-gray-100 text-sm mb-3 mt-3">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>
          {/* Product list */}
          {
            list.map((item, index)=>(
              <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-2 px-2 border border-gray-200 rounded-sm text-sm mb-3 mt-3">
                <img className="w-12" src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency} {item.price}</p>
                <p className="text-right md:text-center cursor-pointer text-lg text-red-600"
                onClick={()=>removeProduct(item._id)}
                >X</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default List;
