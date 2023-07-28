import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const AdminProducts = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [loading, setLoadin] = useState([false]);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoadin(true);
      const respone = await fetch("http://localhost:8000/products");
      if (componentMounted) {
        setData(await respone.clone().json());
        setFilter(await respone.json());
        setLoadin(false);
        console.log(filter);
        console.log(respone);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  function deleteProduct(id) {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // remove deleted product from state
        setProducts(products.filter((product) => product.id !== id));
        console.log("Product deleted");
        window.location.reload(); // Refresh the page
      })
      .catch((error) => console.error(error));
  }

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updateList = data.filter((x) => x.category === cat);
    setFilter(updateList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="button d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic{" "}
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    class="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      <h5 className="card-title mb-0">
                        {product.title && product.title.length > 12
                          ? `${product.title.substring(0, 12)}...`
                          : product.title}
                      </h5>
                    </h5>
                    <p className=" card-text lead fw-bold">${product.price}</p>

                    <div className="d-flex justify-content-between ">
                      <NavLink
                        to={`/updateProduct/${product.id}`}
                        className="btn btn-outline-dark "
                      >
                        Update
                      </NavLink>
                      <NavLink
                        onClick={() => deleteProduct(product.id)}
                        className="btn btn-outline-dark "
                      >
                        Delate
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
