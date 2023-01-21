import React, {useState} from "react";
import {Link , useNavigate}  from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

 export default function Header(){
  const auth = localStorage.getItem('User')
  const navigate = useNavigate()
const [active, setActive] = useState(false); 


const logout =()=>{
  localStorage.clear()
  navigate("/signup")
}
  return(
    <div>
        <Navbar bg="primary" variant="dark" fixed="top">
          <div className="container-fluid px-5 position-relative">
            <Navbar.Brand href="/" className="fw-bolder fs-4 z-index-100">E-commerce</Navbar.Brand>
            {
              auth ? 
              <>
              <div className={active ? "d-flex nav-links-container nav-active" : " d-flex nav-links-container"}>
                <Link to="/" className="text-light link px-4 fw-semibold  nav-links" onClick={() => {setActive(!active)}}><span className="nav-link-hover active">Product</span></Link>  
                <Link to="/add" className="text-light link px-4 fw-semibold  nav-links" onClick={()=>{setActive(!active)}}><span className="nav-link-hover">Add product</span></Link>
                <Link to="/update" className="text-light link px-4 fw-semibold  nav-links" onClick={()=>{setActive(!active)}}><span className="nav-link-hover">Update Product</span></Link>
                <Link to="/profile" className="text-light link px-4 fw-semibold nav-links" onClick={()=>{setActive(!active)}}><span className="nav-link-hover">Profile</span></Link> 
                <Link onClick={logout} to="/signup" className="text-light link px-4 fw-semibold nav-links hide-nav-logout"><span className="nav-link-hover">Logout</span></Link>

              </div> 
              <div className="d-flex"> 
                <Link onClick={logout} to="/signup" className="text-light link fw-semibold nav-link-hover nav-links hide-till-761-px">Logout <span className="hide-till-957-px">({JSON.parse(auth).name})</span></Link>
                <div className={active ? "ham-burger z-index-100 ham-open": "ham-burger z-index-100 "} onClick={()=>{setActive(!active)}}>
                  <span className="lines line-1"></span>
                  <span className="lines line-2"></span>
                  <span className="lines line-3"></span>
                </div>
              </div>
              </>
              : 
              <Container className="d-flex justify-content-end"> 
                <Link to="/login" className="text-light link px-4">login</Link>  
                <Link to="/signup" className="text-light link px-4">SignUp</Link> 
              </Container> 
            }       
          </div>
      </Navbar>
    </div>
)
 }