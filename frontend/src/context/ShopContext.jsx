import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fees = 20;
  // const backendUrl = "https://improved-space-fishstick-g4qxvvxr7j4j3v5rv-4000.app.github.dev"
const backendUrl=import.meta.env.VITE_BACKEND_URL;
    
  

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});

  //Fetching products from backend
  const [products, setProducts] = useState([]);
  const [token, setToken]=useState('')

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/add", {itemId, size}, {headers:{token}})
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };
  // useEffect(()=>{
  //     console.log(cartItem);

  // },[cartItem])

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if(token){
    try {
      await axios.post(backendUrl+"/api/cart/update", {itemId,size, quantity}, {headers:{token}})
      
    } catch (error) {
       console.log(error);
      toast.error(error.message)
    }
  }
  
  };
  

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }

    return totalAmount;
  };

  // Instead of products from assets folder,
  // Now we are fetching all the products from API (Backend Database)

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + '/api/product/list-products'
      );
      // console.log(response);
      if (response.data) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const getUserCart = async(token)=>{
    try {
      
      const response= await axios.post(backendUrl+"/api/cart/get", {},{headers:{token}})
      if(response.data.success){
        setCartItem(response.data.cartData)
      } 

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }
  
  useEffect(() => {
    getProductsData();
  }, []);



  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));      
    }
  },[])

  const value = {
    products,
    currency,
    delivery_fees,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
