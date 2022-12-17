import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'

function WithdrawList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [withdraws, setWithDraws] = useState([])
    const [successPay, setSuccessPay] = useState(false)
    const [errorPay, setErrorPay] = useState(false)
    const [loadingPay, setLoadingPay] = useState(false)
    const [successProduct, setSuccessProduct] = useState(false)
    const [errorProduct, setErrorProduct] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)
    


    //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!userInfo.isAdmin) {
        window.location="/"
    }
   
    useEffect(() => {
        const fetchWithdraws = async () => {
            try {
                setLoading(true)
                const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            
            const { data } = await axios.get('/api/v1/withdraw/admin', config);
            setWithDraws(data)
            setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchWithdraws()
    },[userInfo.isAdmin])

    //console.log(withdraws)
    //handle settlement
    const handlePayment = async(id) => {
        try {
            setLoadingPay(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
             await axios.put("/api/v1/withdraw/ispaid", { id }, config);
            setSuccessPay(true)
            setLoadingPay(false)
        } catch (error) {
            console.log(error)
            setErrorPay(true)
            setLoadingPay(false)
        }
    }
    
    //handle settlement
    const handleSettled = async(id) => {
        try {
            setLoadingProduct(true)
             await axios.put("/api/v1/product/issettled", { id });
            setSuccessProduct(true)
            setLoadingProduct(false)
        } catch (error) {
            console.log(error)
            setErrorProduct(true)
            setLoadingProduct(false)
        }
    }

    

    return (
        <div style={{backgroundColor:"#f5f5f5"}}>
            <h3 style={{ textAlign: "center" }}> List Of Withdraw request</h3>
            {
                withdraws && withdraws.length === 0 ? (<p style={{ backgroundColor: "#f5f5f5", textAlign: "center", height: "50px", padding: "20px" }}>No seller has made request for widthdrawal.</p>) : (<>
                    <div style={{textAlign:"center"}}>
                {
                loading && <LoadingBox></LoadingBox>
            }
                        {error && <MessageBox variant="danger">Failed to load withdrawals.</MessageBox>}
                        {
                loadingPay && <LoadingBox></LoadingBox>
                        }
                        
                        
                        {
            successPay && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="success" onClose={() => setSuccessPay(false)}>Payment is successful.</Alert>
      
             </Stack>
                        }
                        
                        
                        {
            errorPay && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="error" onClose={() => setErrorPay(false)}>Failed to update withdraw</Alert>
      
             </Stack>
                        }
                       
                        {
                loadingProduct && <LoadingBox></LoadingBox>
                        }
                        {
            successProduct && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="success" onClose={() => setSuccessProduct(false)}>Your product has been updated.</Alert>
      
             </Stack>
                        }
                        {
            errorProduct && <Stack sx={{ width: '90%' }} spacing={2}>
               <Alert severity="error" onClose={() => setErrorProduct(false)}>Failed to update</Alert>
      
             </Stack>
                        }
                        
                
            </div>
            <div className='row center'>
                        {
                            withdraws?.map((width) => (
                        <div className='card' key={width._id} style={{padding:"5px"}}>
                                    <p>Id: { width._id} <Button sx={{m:1}} variant="contained" size="small"
                          >
                          <Link to = {`/product/${width.productId}`} style={{color:"white"}}>View</Link>
                                    </Button></p>
                                    <p>Date: {width.requestedAt.substring(0, 10)}</p>
                                    <p>Amount: {((width.amount - (width.amount * 0.03)) + width.deliveryCost).toFixed(2)}</p>
                                    <p>Paid Date: {width.isPaid ? width.isPaidAt.substring(0, 10) : "Pending"}</p>
                                    <p>
                                        Settled?:
                                    {
                                        width.isPaid? "Settled" : <Button sx={{ m: 1 }} variant="contained" size="small" color="secondary" onClick={() => {
                                        handlePayment(width._id)
                                        handleSettled(width.productId)
                                        }}>
                                       Pay
                                       </Button>
                                    }
                                    </p>
                        </div>
                            ))
                        }
                    </div>
                     
                        
                </>)
            }
            
        </div>
    )
}

export default WithdrawList
