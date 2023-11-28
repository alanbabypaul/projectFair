import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../Assets/office-simple-flat-illustration_23-2147492379.avif'

import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthorizationContext } from '../Contexts/TokenAuth';



function Auth({register}) {
  const{isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate()
const [userData,setUserData] = useState({
  username:"",password:"",email:""
})

  const isRegisterForm = register?true:false


const handleRegister =async (e)=>{
  e.preventDefault()
  const {username,email,password} = userData
  if(!username  || !email || !password){
    toast.info("Please fill the form completely")
  }else{
const result = await registerAPI(userData)
console.log(result)
if(result.status===200){
  toast.success(`${result.data.username} has registerd successfully `)
setUserData({
  username:"",
  password:"",
  email:"",
})
navigate('/login')
  }else{
    toast.error (result.response.data)
   console.log( result)

  }
}
}
// handlelogin
const handleLogin =async (e)=>{
  e.preventDefault()
  const {email,password} = userData
  if( !email || !password){
    toast.info("Please fill the form completely")
  }else{
const result = await loginAPI(userData)
console.log(result)
if(result.status===200){
  // toast.success(`${result.data.username} has registerd successfully `)
  sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
  sessionStorage.setItem("token",result.data.token)
  setIsAuthorized(true)
setUserData({
 
  password:"",
  email:"",
})
navigate('/')
  }else{
    toast.error (result.response.data)
   console.log( result)

  }
}
}




  return (
    <div  style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center' >
   <div className='w-75 container'>
      <Link to={'/'} style={{textDecoration:'none'}} > <i class="fa-solid fa-arrow-left"></i> Back to home</Link>
  
<div className='card shadow p-5 bg-success'> 
<div className='row align-items-center'>
  <div className='col-lg-6'>

    <img  className='rounded-start w-100' height={'400px'} src={loginImage} alt="" />
    
  </div>

  <div className='col-lg-6'>
<div className='d-flex align-items-center flex-column'>
<h1  className='fw-bolder text-light mt-1'><i className="fa-brands fa-stack-overflow fa-beat"></i> Project Fair</h1>
<h5 className='fw-bolder mt-2 pb-3 text-light'>

{
  isRegisterForm ? 'sign Up to your account': 'sign In to your account'
}

</h5>



  <Form>
  {
    isRegisterForm &&
  <Form.Group className="mb-3" controlId="formBasicName">
          
          <Form.Control type="text" placeholder="Enter UserName" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}  />
         
        </Form.Group>
  
}



<Form.Group className="mb-3" controlId="formBasicEmail">
          
          <Form.Control type="email" placeholder="Enter emailId" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
         
        </Form.Group>
  



        <Form.Group className="mb-3" controlId="formBasicpaswd">
          
          <Form.Control type="password" placeholder="Enter password"value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  />
         
        </Form.Group>


        {

isRegisterForm ? 
   <div>
<button className='btn btn-light mb-2' onClick={handleRegister}  >Register </button>
<p>
  Already Have Account ?click here to <Link to={'/login'}>Login</Link>
</p>
   </div>:
   <div>
   <button  onClick={handleLogin}  className='btn btn-light mb-2'>Login </button>
   <p>
  New User ?click here to <Link to={'/register'}>Register</Link>
</p>
   </div>


        }
  
  </Form>
  













</div>



  </div>









</div>
</div>











   </div>
   <ToastContainer position='top-right' autoClose={2000}  theme='colored'/>
    </div>
  )
}

export default Auth