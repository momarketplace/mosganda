import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderedProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from "@mui/material/Button";
import { ChatState } from '../context/ChatProvider';
import axios from "axios"

function CustomerOrders() {

    const [createChatLoading, setCreateChatLoading] = useState(false)
  const [errorCreateChat, setErrorCreateChat] = useState(false)
  const [successCreateChat, setSuccessCreateChat] = useState(false)

  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 

  //get ordered products from redux store
  const customerOrders = useSelector((state) => state.customerOrders);
  const { loading, error, orderedProducts } = customerOrders

    //import state from context
  const {setSelectedChat, chats, setChats } =
    ChatState();
  
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getOrderedProducts())
  },[dispatch, userInfo])

    
  //function to create chat between seller and buyer
  //handle chat
  const handleChat = async (userId) => {
    if (!userInfo) {
      window.location = "/login"
      return
    } else {
      try {
     setCreateChatLoading(true)
     const config = {
         headers: {
           "Content-type":"application/json",
           Authorization: `Bearer ${userInfo.token}`
         },
       };
     const { data } = await axios.post('/api/v1/chat', { userId }, config);
     if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
     setCreateChatLoading(false)
     setSuccessCreateChat(true)
        setSelectedChat(data)
        
   } catch (error) {
    setErrorCreateChat(error.message)
   }
    }
   
  }

  if (successCreateChat) {
    window.location = "/chats"
    setTimeout(() => {
      setSuccessCreateChat(false)
    },3000)
  }
  
  console.log(orderedProducts)

    return (
        <div style={{backgroundColor:"white"}}>
            <h3 style={{ textAlign: "center",padding:"10px" }}>Customer orders</h3>
            {
                orderedProducts && orderedProducts.length === 0 ? (<p style={{padding:"20px"}}>
                    This is where you see orders placed by your customer that they have not paid-for. Orders that are paid-for will not be displayed here. Such orders are displayed in Sold-Products page.
                </p>) :
                    (<>
                        {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant ="danger"></MessageBox>:
                <div className ="row center">
                    {
                        orderedProducts.map((product) => (
                            product.buyerName && <div key ={product._id} className="card">
                                <Link to={`/product/${product._id}`}>
                                {/* image size should be 680px by 830px */}
                                <img
                                className="medium"
                                src={product.image}
                                alt={product.name}
                                />
                                </Link>
                                <div className ="card-body">
                                <Link to={`/product/${product._id}`}>
                                <p>Product Name: <strong>{product.name}</strong></p>
                                </Link>
                                <p className="price">Price: <strong>#{product.price}</strong></p>
                                <div>
                                <h5>Customer Information</h5>
                                <p>Name: <strong>{product.buyerName}</strong>  <Button variant="contained" color="primary" size="small" onClick={() => {
                                         
                                         handleChat(product.buyerId)
                                    }}>
                                    Send Message
                                  </Button></p>
                                  {
                          createChatLoading && <LoadingBox></LoadingBox>
                          }
                          {
                            errorCreateChat &&
                            <MessageBox variant="danger">Error</MessageBox>
                          }
                                <p>Phone: <strong>{product.buyerPhone}</strong></p>
                                <p style={{maxWidth:"250px"}}>Address: <strong>{product.buyerAddress}</strong></p>
                                <p>Payment Status: <strong>{product.isPaid? "Paid": "Not Yet Paid"}</strong></p>
                                <p>Payment Date: <strong>{product.isPaid? product.isPaidAt.substring(0, 10): "Not Yet Paid"}</strong></p>
                                </div> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
                    </>)
            }
            
          </div>  
    )
}

export default CustomerOrders
