import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { addProjectResponseContext } from '../Contexts/ContextShare';



function AddProjects() {
  const{addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const[preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title:"", languages:"", overview:"", github:"", website:"", projectImage:""
    })
  setPreview("")
  }
  // handle show
  const handleShow = () => setShow(true);
  const [projectsDetails,setProjectDetails] = useState({
    
    title:"", language:"", overview:"", github:"", website:"", projectImage:""
  })
// console.log(projectsDetails)



// preview img
  useEffect(()=>{
    if(projectsDetails.projectImage){
      setPreview(URL.createObjectURL(projectsDetails.projectImage))
    }
  },[projectsDetails.projectImage])

  // handleADD

  const handleAdd = async (e)=>{
    e.preventDefault()
    const {title,language,overview, projectImage,github,website} = projectsDetails
    if(!title || !language || !overview || !projectImage || !github || !website){
      toast.info("please fill the form completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", language)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)
      reqBody.append("github", github)
      reqBody.append("website", website)
      const token =sessionStorage.getItem("token")
// console.log(token)
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
       "Authorization" :`Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result)
     
      if(result.status ===200){
        console.log(result.data);
        handleClose()
        setAddProjectResponse(result.data);


      }else{
        console.log(result);
        toast.warning(result.response.data);
      }
    }

     
    }
  }


 
  return (
    <>
     <Button variant="success" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project-Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-lg-6">
                    <label>
                        <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectsDetails,projectImage:e.target.files[0]})} />
                        <img   style={{width:'19rem'}}  className='image-fluid' src= {  preview?preview: "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"}  alt="" />
    
                    </label>                
                    </div>
                   
<div className='col-lg-6'>
    <div className="mb-3">
        <input type="text" className='form-control' placeholder='Project title' value={projectsDetails.title} onChange={e=>setProjectDetails({...projectsDetails,title:e.target.value})} />
    </div>
    <div className="mb-3">
        <input type="text" className='form-control' placeholder='Language Used'  value={projectsDetails.language} onChange={e=>setProjectDetails({...projectsDetails,language:e.target.value})}  />
    </div>
    <div className="mb-3">
        <input type="text" className='form-control' placeholder='Github Link' value={projectsDetails.github} onChange={e=>setProjectDetails({...projectsDetails,github:e.target.value})}/>
    </div>
    <div className="mb-3">
        <input type="text" className='form-control' placeholder='LinkedIn Link'value={projectsDetails.website} onChange={e=>setProjectDetails({...projectsDetails,website:e.target.value})} />
    </div>
    <div className="mb-3">
        <input type="text" className='form-control' placeholder='description'value={projectsDetails.overview} onChange={e=>setProjectDetails({...projectsDetails,overview:e.target.value})} />
    </div>


</div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-right' autoClose={2000}  theme='colored'/>

    </>
  )
}

export default AddProjects