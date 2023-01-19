import React from "react";
import {Link , useNavigate}  from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
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
          {/* <Nav className="me-auto">
            <Nav.Link href="/">Product</Nav.Link>
            <Nav.Link href="/add">Add product</Nav.Link>

            <Nav.Link href="/update">Update Product</Nav.Link>

            <Nav.Link href="/logout">Logout</Nav.Link>

            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav> */}
              <Link to="/" className="text-light link" >Product</Link>  
              <Link to="/add" className="text-light link">Add product</Link>
              <Link to="/update" className="text-light link">Update Product</Link>
              <Link to="/profile" className="text-light link">Profile</Link>              
              {auth ?<Link onClick={logout} to="/signup" className="text-light link">Logout</Link>  : <Link to="/signup" className="text-light link">SignUp</Link>   }

        </Container>
      </Navbar>
    </div>
)
 }