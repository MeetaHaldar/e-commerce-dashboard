import './App.css'
import {BrowserRouter , Route , Routes}  from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import PrivateComponent from './components/PrivateComponent'
import Login from "./components/Login"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <p>E-Dashboard</p>
      <Routes>
        <Route element ={<PrivateComponent/>}>
        <Route path="/"element={<h1>Producr listing componets</h1>} />
        <Route path="/add"element={<h1>Add product components</h1>} />
        <Route path="/profile"element={<h1>your profile</h1>} />
        <Route path="/update"element={<h1>update products</h1>} />
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
