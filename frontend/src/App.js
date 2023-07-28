import "./App.css";
import React from "react";
import Navbar from "./component/Navbar";
import UserComponent from "./component/UserComponent";
import Footer from "./component/Footer";


function App() {
  return (
    <div className="app">
      <Navbar />
      <UserComponent />
      <Footer/>

    </div>
  );
}

export default App;
