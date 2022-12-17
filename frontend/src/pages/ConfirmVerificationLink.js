import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LoadingBox from '../components/LoadingBox';
import Button from "@mui/material/Button";


function ConfirmVerificationLink() {
    const {id} = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //const [success, setSuccess] = useState(false);
    const [result, setResult] = useState()

    useEffect(() =>{
        const updateUserStatus = async() =>{
            try {
                setLoading(true)
                const {data} = await axios.put(`/api/v1/user/confirmverification/${id}`)
                setLoading(false)
                setResult(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        updateUserStatus()
    },[id])

    const handleLogin = ()=>{
        window.location = '/login'
    }
console.log(result)
    return (
        <div className='row center' style={{display:"flex", flexDirection:"column"}}>
            <h3>Confirm Email Verification</h3>
            {
                loading && <LoadingBox></LoadingBox>
            }
            {
              error && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setError(false)}>Failed to confirm verification</Alert>
      
            </Stack>
           }
           
            {
                result && 
                <p>Dear {result.name}, your email has been verified.</p>
            }

<Button variant="contained" color="primary" size="small" onClick={handleLogin}>
                Proceed to login
              </Button>
           
        </div>
    )
}

export default ConfirmVerificationLink