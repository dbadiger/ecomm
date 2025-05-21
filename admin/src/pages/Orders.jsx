import React,{ useState ,useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {backendUrl, currency} from '../App'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders, setOrders]=useState([])

  const fetchAllOrders = async()=>{

    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl+"/api/order/list",{}, {headers:{token}})
      // console.log(response.data);
      if(response.data.success){
        setOrders(response.data.orders.reverse())
        // console.log(response.data.orders);
        
      }else{
        toast.error(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error);
    toast.error(response.data.message)
      
    }
  }

  const statusHandler = async(event, orderId)=>{
    try {
      const response =await axios.post(backendUrl+"/api/order/status", {orderId, status:event.target.value}, {headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Orders Page</h3>
      <div >
        {orders.map((order, index)=>(
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
              <img src={assets.parcel_icon} alt="" className='w-12'/>
              <div>
              <div>
                {order.items.map((item, index)=>{
                  if(index=== order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  }else{
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
               <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
               <div>
                <p>{order.address.street +", "}</p>
                <p>{order.address.city +", "+ order.address.state +", "+ order.address.state +", "+order.address.country +", "+order.address.zipcode +", "}</p>
               </div>
               <p>{order.address.phone}</p>
          </div>
          <div>
            <p className='tetx-sm sm:tetx-[16px]'>Items:{order.items.length}</p>
            <p className='mt-3'>Method:{order.paymentMethod}</p>
            <p>Payment:{order.payment ?'Done':'Pending'}</p>
            <p>Date:{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className='tetx-sm sm:text-[16px]'>{currency} {order.amount}</p>
          <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Devlivered">Devlivered</option>
          </select>
          </div>
      ))}
      </div>

     
    </div>
  )
}

export default Orders
