import './App.css'
import './index.css'
import {BrowserRouter , Route , Routes}  from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import PrivateComponent from './components/PrivateComponent'
import Login from "./components/Login"
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'
import Profile from './components/Profile'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <p>E-Dashboard</p>
      <Routes>
        <Route element ={<PrivateComponent/>}>
        <Route path="/"element={<ProductList/>}/>
        <Route path="/add"element={<AddProduct/>} />
        <Route path="/profile"element={<Profile/>} />
        <Route path="/update"element={<h2>Nothing here to update</h2>} />
        <Route path="/update/:id"element={<UpdateProduct/>} />
        <Route path="/logout"element={<h1>logout</h1>} />
        </Route>
        <Route path='/signup' element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
