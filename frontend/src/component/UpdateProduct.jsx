import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"


const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    // Fetch the existing product data and update the form fields
    const fetchProductData = async () => {
      try {
        // Make a GET request to retrieve the existing product data
        const response = await axios.get(`http://localhost:8000/product/${id}`);

        // Update the form data with the retrieved product data
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          image: response.data.image, // Since we don't want to pre-fill the image field
        });
      } catch (error) {
        // Handle any errors that occurred during the API request
        console.log(error);
      }
    };

    fetchProductData();
  }, []);
  
  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // Store the selected image file
      setFormData({ ...formData, image: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {

      
      // Create a form data object to send the updated product data
      const updatedFormData = new FormData();
      updatedFormData.append("title", formData.title);
      updatedFormData.append("price", formData.price);
      updatedFormData.append("description", formData.description);
      updatedFormData.append("category", formData.category);
      updatedFormData.append("image", formData.image);
      
      // Make a PUT request to the API endpoint
      const response = await axios.put(
        `http://localhost:8000/product/${id}`,
        updatedFormData
      );
      
      // Handle the response as desired (e.g., display a success message)
      console.log(response.data);
      navigate("/AdminProducts");
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.log(error);
    }
  };
  
  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-95">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card  border rounded-lg border-info">
                <div className="card-body p-5 ">
                  <h2 className="text-center mb-5">Update Product</h2>
                  <div className="form-group form-outline mb-3">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group form-outline mb-3">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control form-outline mb-3"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group form-outline mb-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        className="form-control form-outline mb-3"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group form-outline mb-3">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group form-outline mb-3">
                      <label htmlFor="category">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <label className="form-label">Upload Product Image</label>
                      <input
                        type="file"
                        className="form-control border border-info form-control-lg"
                        id="exampleFormControlFile1"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-between ">
                      <button type="submit" className="btn btn-info mr-2">
                        Update Product
                      </button>
                      <button type="reset"  className="btn btn-secondary ml-2">
                        Reset
                      </button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
