import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { toast } from 'react-toastify';
import { editUserAPI } from '../services/allAPI';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userProfile,setUserProfile] = useState({
        username:"",
        password:"",
        email:"",
        profile:"",
        github:"",
        linkedin:""
    })

const[existingImage,setExistingImage] = useState("")
const[preview,setPreview] = useState("")

useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
if(user.profile!==""){
   
setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,
    linkedin:user.linkedin,profile:""})
    setExistingImage(user.profile)
}else{
    setExistingImage("https://png.pngtree.com/png-vector/20210921/ourlarge/pngtree-flat-people-profile-icon-png-png-image_3947764.png" )
}
},[open])
    useEffect(()=>{
if(userProfile.profile){
    setPreview(URL.createObjectURL(userProfile.profile))
}else{
    setPreview("")
}

    },[userProfile.profile])

    // handle update

    const handleProfileUpdate = async ()=>{
const {username,email,password,github,linkedin,profile} =userProfile
if(!github || !linkedin){
    toast.info('please fill th form')
}else{
    const reqBody = new FormData()
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)

    preview? reqBody.append("profileImage",profile): reqBody.append("profileImage",existingImage)
    const token = sessionStorage.getItem("token")
    if(preview){
        const reqHeader = {
            "Content-Type":"multipart/form-data",
           "Authorization" :`Bearer ${token}`
          }
        //   api call
        const result = await editUserAPI(reqBody,reqHeader)
        if(result.status===200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
            setOpen(!open)
            console.log(result);
            toast.error(result.response.data)
        }


    }else{
        const reqHeader = {
            "Content-Type":"application/json",
           "Authorization" :`Bearer ${token}`
          }
        //   api call
        const result = await editUserAPI(reqBody,reqHeader)
        if(result.status===200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
            setOpen(!open)
            console.log(result);
            toast.error(result.response.data)
        }
    }
}
    }
  return (
    <div className=' shadow p-5 mt-5'>
        <div className='d-flex justify-content-between'>
            <h2>Profile</h2>
            <button onClick={() => setOpen(!open)} className="btn btn-outline-info"><i class="fa-solid fa-chevron-down fa-beat"></i></button>
        </div>
        <Collapse in={open}>
        <div className='row justify-content-center mt-3'>
            {/* upload picture */}
            <label className='text-center' >
                <input type="file" style={{display:'none'}} onChange={e=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
               
                <img width={'300px'} height={'300px'} className='rounded-circle' src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="upload picture" />
            </label>
            <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Github' value={userProfile.github} onChange={e=>setUserProfile({...userProfile,github:e.target.value})}/>
            </div>
            <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Linkedin' value={userProfile.linkedin} onChange={e=>setUserProfile({...userProfile,linkedin:e.target.value})} />
            </div>
            <div className='mt-3 d-grid gap-2'>
            <Button variant="success" size="lg" onClick={handleProfileUpdate}>
        Update
      </Button>
            </div>
        </div>
        </Collapse>
    </div>
  )
}

export default Profile