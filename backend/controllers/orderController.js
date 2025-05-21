import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay'

//Global Variables
const currency ='inr'
const deliveryCharge = 20

// Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORRPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

// Placing Orders using COD Method
const placeOrder = async(req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items, 
            amount, 
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true, message:'Order Placed.'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Placing Orders using Stripe Method
const placeOrderStripe = async(req, res)=>{

    try {
        const {userId, items, amount, address} = req.body;
        const {origin}=req.headers;

         const orderData = {
            userId,
            items, 
            amount, 
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
         const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
    }))
    line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge *100
            },
            quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
        
    })
    res.json({success:true, session_url:session.url})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


// Verifying th Stripe
const verifyStripe = async(req, res)=>{
    const {orderId, success, userId}=req.body
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
         res.json({success:false, message:error.message})     
    }
}


// Placing Orders using Razorpay Method
const placeOrderRazorpay = async(req, res)=>{

    try {
         const { userId, orderData } = req.body;
        const { items, amount, address } = orderData;
        // console.log("Request Boday data: ",req.body);
      
         const numericAmount = Number(amount);

        if (isNaN(numericAmount)) {
            return res.json({ success: false, message: "Amount must be a valid number." });
        }
         const orderDataToSave = {
            userId,
            items, 
            amount: numericAmount, 
            address,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }
        // console.log("Order Data Before Saving:", orderDataToSave);
        
         const newOrder = new orderModel(orderDataToSave)
        await newOrder.save();

        const options = {
            amount: numericAmount *100,
            
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }
       await  razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                // console.log("Razorpay Error:", error);
                return res.json({ success: false, message: error });
            } else {
                // console.log("Order Confirmed:", order);
                res.json({ success: true, order });
            }
        })

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

//Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id, razorpay_payment_id } = req.body;
        console.log("Order ID: ",razorpay_order_id);
        // console.log("Payment ID: ",razorpay_payment_id);
        
       
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log( orderInfo.status);
        // const paymentInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);
        // console.log("Order Info:", paymentInfo);

        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true, message:"payment Successful"})
        }else{
            res.json({success:false, message:"Payment failed"})
        }
           
        
    } catch (error) {
        console.log("Error during payment verification:", error);
        res.json({ success: false, message: error.message });
    }
};

// Display All orders on Admin Panel
const allOrders = async(req, res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})



    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// Display All orders for Particular User
const userOrders = async(req, res)=>{

    try {
        
        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


// Update Order Status from Admin Panel
const updateStatus = async(req, res)=>{

    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

export {verifyStripe, placeOrder, placeOrderRazorpay, verifyRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus}