import React  , {useState , useEffect}from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function ProductList() {
    const [products , setProducts]  = useState([])
    useEffect(()=>{
        getProducts();

    },[])
    const getProducts=async()=>{
        let result = await fetch("http://localhost:3000/getProducts",{
          headers:{
            authorization :JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json()
        setProducts(result)
    }
    const deleteProduct =async (id)=>{
        let result = await  fetch(`http://localhost:3000/product/${id}` ,{
            method :"Delete",
            headers:{
              authorization :JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        alert("product has been deleted")
        getProducts();
    }
    const searchHandle = async(event)=>{
        let key = event.target.value
        if(key)
        {
            let result = await fetch(`http://localhost:3000/search/${key}`,
            {
              headers:{
                authorization :JSON.parse(localStorage.getItem('token'))
              }
            });
            result = await result.json()
            if(result) setProducts(result)
        }
        else {
            getProducts()
        }
  



    }
  return (
    <div>
        <h2>Product List</h2>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchHandle}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>S.No</th>
          <th>name</th>
          <th>price</th>
          <th>category</th>
          <th>company</th>
          <th>Operations</th>

        </tr>
      </thead>
      <tbody>
            { products.length > 0 ? products.map((item, index) =>
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>

                <td>{item.category}</td>
                <td>{item.company}</td>
                <td><button  onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"update/" +item._id}>Update</Link>
                </td>

                </tr>

                ) : <tr><td colSpan={6} className="center">No result found</td></tr>
            }
      </tbody>
    </Table>
    </div>
  )
}

export default ProductList