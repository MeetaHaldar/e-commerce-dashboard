import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function AddProduct() {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const addproduct = async () => {
    // console.log(name , category , price , company)
    const userId = JSON.parse(localStorage.getItem("User"))._id;
    if (!price || !name || !category || !company) {
      setError(true);
      return false;
    }
    let result = await fetch("https://e-commerce-dashboard-fct9u6whb-meetahaldar.vercel.app/add", {
      method: "post",
      body: JSON.stringify({ name, category, price, company, userId }),
      headers: {
        "content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    alert("product added successfully");
    navigate("/");
    // console.log(result)
  };
  return (
    <div className="add-product-container d-flex justify-content-center flex-column align-items-center m-5">
        <h2 className="heading-2 mb-4">Add Product</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of the product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <Form.Text className="text-muted invalidInput">
              <span className="invalidInput"> Product name missing </span>
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Price : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <Form.Text className="text-muted invalidInput">
              <span className="invalidInput"> Product price missing </span>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Category : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && (
            <Form.Text className="text-muted invalidInput">
              <span className="invalidInput"> Product category missing </span>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Company : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && (
            <Form.Text className="text-muted invalidInput">
              <span className="invalidInput">
                {" "}
                Product company name is missing{" "}
              </span>
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" onClick={addproduct}>
          Add Product
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
