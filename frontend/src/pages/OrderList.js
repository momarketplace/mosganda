import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SearchIcon from '@mui/icons-material/Search';



function OrderList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  const [orders, setOrders] = useState([])
  const [search,setSearch] = useState("")
  const [result, setResult] = useState()

    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
  }

  useEffect(() =>{
    const fetchOrders = async() => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/v1/order/admin', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setLoading(false)
            setOrders(data)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }
    fetchOrders()
  },[])

  //console.log(orders)

const handleSearch = (e) =>{
    e.preventDefault();

    if(orders){
       setResult( orders.filter((o) => {
        if(o._id === search){
            return o
        }
    }))
    setSearch("")
    }
    return result

}
//console.log(result)


    return(
        <div>
             <h3 style={{ textAlign: "center" }}>List of orders</h3>
             <form className='mosganda-header-search' onSubmit={handleSearch}>
              <input type="text" id="search" className='mosganda-search-input' placeholder=' Find order by Id'
               value={search}
              onChange={(e) => setSearch(e.target.value)}
              
            />
            
              <button className='mosganda-header-searchIconContainer' type = "submit"><SearchIcon /></button>
              
        </form>

        {
            result && <p>{result._id}</p>
        }


{/*display result of specific order */}
<div className="row center">
        
        {
        result?.map((order) => (
            <div key={order._id} style={{border:"1px solid black", margin:"3px",backgroundColor:"#f8f8f8"}}>
           <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {order._id} {" "} </h4>
           
                <table className="table">
                    <thead>
                        <tr>
                        
                            <th>Seller</th>
                            <th>Buyer</th>
                            <th>amount</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                                
                            <td>{order.orderItems.map((s)=>s.sellerName)}</td>
                            <td>{order.shippingAddress.fullName}</td>
                            <td>{order.totalPrice}</td>
                            <td><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }}>
                            <Link to = {`/order/${order._id}`} style={{color:"white"}}>View</Link>
               </Button></td>
                        
                    </tr>
            
        
                    
                </tbody>
            </table >
                                    
                
            </div>
            ))
        }
        </div>




         {/*display all orders*/}

            <div className="row center" style={{marginTop: "10px"}}>
            {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Failed to load stores.</MessageBox>}
        
        
        {
        orders?.map((order) => (
            <div key={order._id} style={{border:"1px solid black", margin:"3px",backgroundColor:"#f8f8f8"}}>
           <h4 style={{ marginBottom: "1px", marginLeft: "5px" }}>Id: {order._id} {" "} </h4>
           
                <table className="table">
                    <thead>
                        <tr>
                        
                            <th>Seller</th>
                            <th>Buyer</th>
                            <th>amount</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                                
                            <td>{order.orderItems.map((s)=>s.sellerName)}</td>
                            <td>{order.shippingAddress.fullName}</td>
                            <td>{order.totalPrice}</td>
                            <td><Button variant="contained" color="primary" type="submit" size="small" sx={{ mb: 2 }}>
                            <Link to = {`/order/${order._id}`} style={{color:"white"}}>View</Link>
               </Button></td>
                        
                    </tr>
            
        
                    
                </tbody>
            </table >
                                    
                
            </div>
            ))
        }
        </div>
        </div>
    )
}

export default OrderList



