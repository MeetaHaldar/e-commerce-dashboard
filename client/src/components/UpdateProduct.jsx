import React , { useState , useEffect}from "react"
import {useNavigate , useParams} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function UpdateProduct() {
    const [price , setPrice] =useState("");
    const [name , setName] =useState("");
    const [category , setCategory] =useState("");
    const [company , setCompany] =useState("");
    const params = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
    
        getProductDetails()
    },[])
        const getProductDetails= async (req, res)=>{
    console.log(params)
    let result = await fetch(`http://localhost:3000/product/${params.id}`)
    result = await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
    // console.log(result)
}
    const updateproduct= async()=>{
    //   console.log(name , category , price , company)
      const userId =JSON.parse(localStorage.getItem('User'))._id
      let  result =  await fetch(`http://localhost:3000/product/${params.id}` , {
  method :"put",
  body : JSON.stringify({ name , category , price , company , userId}) , 
  headers :{
    'content-type' :'application/json'
  }

})
result = await result.json()
alert("product updated successfully")
navigate("/")
// console.log(result)
    }
  return (
    <div><Form>
    <h1>Update Product</h1>
<Form.Group className="mb-3">
<Form.Label>Product Name : </Form.Label>
<Form.Control type="text" placeholder="Enter name of the product" value={name} onChange={(e)=>setName(e.target.value)} />

</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Product Price : </Form.Label>
<Form.Control type="text" placeholder="Enter price" value={price} onChange={(e)=>setPrice(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Product Category : </Form.Label>
<Form.Control type="text" placeholder="Enter category" value={category} onChange={(e)=>setCategory(e.target.value)} />

</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Product Company : </Form.Label>
<Form.Control type="text" placeholder="Enter company name" value={company} onChange={(e)=>setCompany(e.target.value)} />

</Form.Group>
<Button variant="primary"  onClick={updateproduct}>
Update Product
</Button>
</Form></div>
  )
}

export default UpdateProduct