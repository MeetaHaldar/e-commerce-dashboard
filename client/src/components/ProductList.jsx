import React  , {useState , useEffect}from 'react'
import Table from 'react-bootstrap/Table';

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
                </tr>

                )}

      </tbody>
    </Table>
    </div>
  )
}

export default ProductList