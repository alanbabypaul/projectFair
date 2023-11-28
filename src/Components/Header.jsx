import React, { useContext } from 'react'
import { Container,Navbar } from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import { tokenAuthorizationContext } from '../Contexts/TokenAuth'
function Header({insideDashboard}) {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate()
  // handleLogOut
  const handleLogOut = ()=>{
    // remove all existing user from from session storage
    sessionStorage.removeItem("existingUser")
     // remove all token from from session storage
     sessionStorage.removeItem("token")
     setIsAuthorized(false)
   
     navigate('/')
  }
  return (
    <>
   
    <Navbar style={{backgroundColor:'#90ee90'}} className='position-fixed top-0 w-100'>
        <Container> 
          <Navbar.Brand>
          <h1 style={{fontSize:'30px'}} className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-beat"></i> Project Fair</h1>
          </Navbar.Brand>
{ insideDashboard &&
            <button onClick={handleLogOut} type="button" class="btn btn-success">Logout <i class="fa-solid fa-arrow-right-from-bracket fa-beat"></i></button>
}

       </Container>
      </Navbar>
    </>
  )
}

export default Header