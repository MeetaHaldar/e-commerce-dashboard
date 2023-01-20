import React  , {useState , useEffect}from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products , setProducts]  = useState([])
    useEffect(()=>{
        getProducts();

    },[])
    const getProducts=async()=>{
        let result = await fetch("http://localhost:3000/getProducts");
        result = await result.json()
        setProducts(result)
    }
    const deleteProduct =async (id)=>{
        let result = await  fetch(`http://localhost:3000/product/${id}` ,{
            method :"Delete"
        })
        result = await result.json()
        alert("product has been deleted")
        getProducts();
    }
  return (
    <div>
        <h2>Product List</h2>
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
            {products.map((item, index) =>
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

                )}

      </tbody>
    </Table>
    </div>
  )
}

export default ProductList