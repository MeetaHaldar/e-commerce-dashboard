import React from "react";
import {Link , useNavigate}  from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

 export default function Header(){
  const auth = localStorage.getItem('User')
  const navigate = useNavigate()

const logout =()=>{
  localStorage.clear()
  navigate("/signup")
}
  return(
    <div>
         <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">E-commerce</Navbar.Brand>
          {
            auth ? 
            <>
              <Link to="/" className="text-light link" >Product</Link>  
              <Link to="/add" className="text-light link">Add product</Link>
              <Link to="/update" className="text-light link">Update Product</Link>
              <Link to="/profile" className="text-light link">Profile</Link> 
              <Link onClick={logout} to="/signup" className="text-light link">Logout ({JSON.parse(auth).name})</Link>
            </> : <> <Link to="/login" className="text-light link">login</Link>  <Link to="/signup" className="text-light link">SignUp</Link> </> 
          }
                         
  
                            
           
        </Container>
      </Navbar>
    </div>
)
 }