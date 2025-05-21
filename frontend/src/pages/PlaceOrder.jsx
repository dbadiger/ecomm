import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {

  const [method, setMethod]=useState('cod')
  const {navigate, backendUrl, token, cartItem, setCartItem, getCartAmount, delivery_fee, products}=useContext(ShopContext)

  const [formData, setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name=event.target.name;
    const value=event.target.value;
    
    setFormData(data=>({ ...data, [name]: value }))
  }

//Razorpay handling
  const initPay = (order)=>{
    const options = {
      key:import.meta.env.VITE_RAZORRPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl+"/api/order/verifyRazorpay",response, {headers:{token}})
          if(data.success){
            navigate("/orders")
            setCartItem({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error)
          
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const onSubmitHandler = async(event)=>{
    
    event.preventDefault();
    try {
      
      let orderItems = []
      for(const items in cartItem){
        
        
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0){
            const itemInfo = structuredClone(products.find(product =>product._id === items))
           
            
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
       
      let orderData = {
        address:formData,
        items:orderItems,
        amount: (typeof getCartAmount() === 'number' ? getCartAmount() : 0) + (typeof delivery_fee === 'number' ? delivery_fee : 20)

      }
      // console.log(orderData);
      
      switch (method) {
        //API for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}} )
          if(response.data.success){
            setCartItem({})
            navigate('/orders')
          }else{
            toast.error(error.message)
          }
          break;

          case 'stripe':
            const responseStripe =await axios.post(backendUrl+"/api/order/stripe", orderData, {headers:{token}})
            // console.log(responseStripe.data);
            
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.messagee)
            }
            
            break;

          case 'razorpay':
            const responseRazorpay = await axios.post(backendUrl+"/api/order/razorpay", {orderData},{headers:{token}})
            if(responseRazorpay.data.success){
              // console.log(responseRazorpay.data.order);
              initPay(responseRazorpay.data.order)
            }

            break;
      
        default:
          break;
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
     {/* Left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY '} text2={"DETAILS"}/>
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' />
        </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email}  type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street}  type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />

          <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city}  type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state}  type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
        </div>
          <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode}  type="Number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country}  type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Contry' />
        </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone}  type="Number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Contact Number' />
      </div>

      {/* Left */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT '} text2={'METHOD'}/>
          {/* payment methods */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex items-center border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400':''}`}></p>
             <p className='text-gray-500 text-sm font-medium mx-4'> Cash on Delivery</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button 
            // onClick={()=>navigate('/orders')}
            type='submit'
            className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
