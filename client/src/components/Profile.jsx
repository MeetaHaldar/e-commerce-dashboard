import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
export default function Profile() {
  const auth = localStorage.getItem("User");
  return (
    <div className="profile-container w-75 mx-auto my-5">
      <Card className="text-center">
        <Card.Header>Profile Card</Card.Header>
        <Card.Body>
          <Card.Text> Name : {JSON.parse(auth).name}</Card.Text>
          <Card.Text> Email : {JSON.parse(auth).email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
