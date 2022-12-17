import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import axios from "axios"


function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
  const [show, setShow] = useState()

  //activate send verification button
  const [loadVerification, setLoadVerification] = useState(false)
  const [errorVerification, setErrorVerification] = useState(false)
  const [result, setResult] = useState()
  const [checkEmail, setCheckEmail] = useState(false)
  


    //const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    //get access to userLogin from redux store
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    //function to submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
        
    }
    //keep track of changes to userInfo
    useEffect(() => {
      if (userInfo) {
            window.location = "/"
        }
    }, [userInfo])

    //handle verification function
  const handleVerification = async() =>{
    try {
      if(!email){
        setCheckEmail(true)
        return
      }
      setLoadVerification(true)
      const { data} = await axios.post('/api/v1/user/sendverificationlink', { email })
      setLoadVerification(false)
      setResult(data)
      setEmail('')
      setPassword('')
    } catch (error) {
      setErrorVerification(true)
      setLoadVerification(false)
    }
  }
  
    return (
      <div>
        
          <form onSubmit={handleSubmit}>
          <div className='login'>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <div className='register-items'>
            <label htmlFor="email">Email<span className="required-field">*</span></label>
              <input
                className='login-input'
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            
            <div>
              <div className='login-forgot-password-container'>
                <label htmlFor="password">Password<span className="required-field">*</span> </label>
              <Link to="/forgotpassword" style={{fontSize:"14px", color:"blue"}}>
                forgot password?
              </Link>
              </div>
            <div className="login-password">
                <input
                  className='login-input-password'
                type={show ? "test" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className='login-view-button' onClick={() => setShow(!show)}>
                {show ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
            </div>
            
            <button type="submit" class="register-button">Login</button>
            <div class="signin">
            <p style={{fontSize:'13px'}}>New user? <Link to="/register">Create Account</Link>.</p>
            <p style={{fontSize:'13px'}}>Email not verified? <Button variant="contained" color="primary" size="small" onClick={handleVerification}>
                Send Verification link
              </Button></p>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {loadVerification && <LoadingBox></LoadingBox>}
                    {
              result && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setResult("")}>Successful. A verification link has been sent to your email.</Alert>
      
            </Stack>
                    }
                    {
              errorVerification && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorVerification(false)}>Failed to sent verification link.</Alert>
      
            </Stack>
              }
              {
                checkEmail && <Stack sx={{ width: '90%' }} spacing={2}>
                <Alert severity="error" onClose={() => setCheckEmail(false)}>Enter your email above</Alert>
        
              </Stack>
              }
            
          </div>
          
        </form>
        




      </div>
    );
}

export default LoginPage
