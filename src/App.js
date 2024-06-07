import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './component/Home/Home.js';
import Footer from './component/Footer/Footer.js';
import ProductList from './component/Product/ProductList.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Register from './component/User/Register.js';
import Login from './component/User/Login.js';
import Cart from './component/Cart/Cart.js';
import About from './component/About/About.js';

import { VscAccount } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";

function App() {

  return (
	<Router>
  <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <h1>QuickCart</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"> <Link to="/" className='text-decoration-none text-dark fs-4 mx-5'>HOME</Link> </li>
        <li class="nav-item"> <Link to="/products" className='text-decoration-none text-dark fs-4 mx-5'>PRODUCTS</Link> </li>
        <li class="nav-item"> <Link to="/about" className='text-decoration-none text-dark fs-4 mx-5'>ABOUT</Link> </li>
        <li class="nav-item dropdown mx-5">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <VscAccount style={{fontSize:'30px'}} />
          </a>
          <ul class="dropdown-menu">
           <li><Link to="/register" className='dropdown-item'> Register </Link></li>
           <li><Link to="/login" className='dropdown-item'> Login </Link></li>
           <li><button className='dropdown-item' onClick={()=>{localStorage.removeItem('userId'); window.location.replace('/login')}}>Logout</button></li>
          </ul>
        </li>
        <li class="nav-item"> <Link to="/cart-items" className='text-dark fs-4 mx-5'><VscArchive style={{fontSize:'30px'}} /></Link> </li>
      </ul>
    </div>
  </div>
</nav>
              
    <div className="route-comp">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products" element={<ProductList/>} />
        <Route exact path="/products/:id" element={<ProductDetails/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/cart-items" element={<Cart/>} />
      </Routes>
    </div>
    
    <Footer/>

	</Router>
  );
}

export default App;
