import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Signup() {
  useEffect(() => {
    const auth = localStorage.getItem("User");
    if (auth) {
      navigate("/");
    }
    // else {
    //   navigate("/signup")
    // }
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const dataCollect = async () => {
    if (
      name != null &&
      email != null &&
      password != null &&
      name != "" &&
      email != "" &&
      password != ""
    ) {
      // console.log("helllothere",name , email , password)
      let result = await fetch("https://e-commerce-dashboard-otafycm29-meetahaldar.vercel.app/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result.email || result.name || !result.password) {
        localStorage.setItem("User", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("please enter correct details");
        navigate("/signup");
      }
    } else {
      alert("Please enter Value");
    }
  };

  return (
    <div className="form signup-form-container d-flex justify-content-center flex-column align-items-center m-5">
        <h2 className="heading-2 mb-4">Sign Up</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={dataCollect}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
