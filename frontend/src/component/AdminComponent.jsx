
import { Routes, Route } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AddProducts from "./AddProducts";
import UpdateProduct from "./UpdateProduct";
import AdminLogin from "./AdminLogin";
// import AdminNavbar from "./AdminNavbar";

function AdminComponent() {
  return (
    <div className="app">
        {/* <AdminNavbar/> */}
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default AdminComponent;
