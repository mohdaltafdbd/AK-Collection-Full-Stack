import React, { useEffect, useState } from "react";

const AddProducts = () => {
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setFormData((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedFormData = new FormData();
      updatedFormData.append("title", formData.title);
      updatedFormData.append("price", formData.price);
      updatedFormData.append("description", formData.description);
      updatedFormData.append("image", formData.image);
      updatedFormData.append("category", formData.category);

      const response = await fetch("http://localhost:8000/add-product", {
        method: "POST",
        body: updatedFormData,
      });

      const data = await response.json();
      setProductData(data);
      console.log(updatedFormData);
      console.log(formData);
      window.location.reload(); // Refresh the page

    } catch (error) {
      console.error(error);
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
                  <h2 className="text-center mb-5">Add Product</h2>
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
                        Add Product
                      </button>
                      <button type="reset" className="btn btn-secondary ml-2">
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
    </section>
  );
};

export default AddProducts;
