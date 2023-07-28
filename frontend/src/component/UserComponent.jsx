import Navbar from "./Navbar";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import Login from "./Login";
import Profile from "./Profile";
import SignUp from "./SignUp";
import AdminProducts from "./AdminProducts";
import AddProducts from "./AddProducts";
import UpdateProduct from "./UpdateProduct";
import AdminLogin from "./AdminLogin";
import About from "./About";
import ContactPage from "./ContactPage";
import PaymentGatewayPage from "./PaymentGatewayPage";
import Payment from "./Payment";

function UserComponent() {
  return (
    <div className="app">

        <Navbar />
        <Routes >
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<PaymentGatewayPage/>}/>
          <Route path="/products/:id" element={<Product />} />
               <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        </Routes>

    </div>
  );
}

export default UserComponent;
