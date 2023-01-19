import React , { useState , useEffect}from "react"
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Signup(){
  useEffect(()=>{
    const auth = localStorage.getItem('User')
    if(auth)
    {
      navigate("/")
    }
    // else {
    //   navigate("/signup")
    // }

  })
    const [name , setName] =useState("");
    const [password , setPassword] =useState("");
    const [email , setEmail] =useState("");
    const navigate = useNavigate()

    const dataCollect = async()=>{
        // console.log("helllothere",name , email , password)
        let  result =  await fetch("http://localhost:3000/register" , {
          method :"post",
          body : JSON.stringify({name , email , password}) , 
          headers :{
            'content-type' :'application/json'
          }
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("User"  , JSON.stringify(result))
        if(result){
          navigate("/")
        }
    }

    return(
        <div className="form">
             <Form>
            <h1>Sign Up</h1>

         <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Button variant="primary"  onClick={dataCollect}>
        Submit
      </Button>
    </Form>
        </div>

    )
}