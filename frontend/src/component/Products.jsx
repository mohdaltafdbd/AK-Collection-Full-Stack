import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [loading, setLoading] = useState([false]);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8000/products");
      if (componentMounted) {
        const products = await response.json();
        setData(products);
        setFilter(products);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-6 col-md-3 mb-4">
          <Skeleton height={350} />
        </div>
        <div className="col-6 col-md-3 mb-4">
          <Skeleton height={350} />
        </div>
        <div className="col-6 col-md-3 mb-4">
          <Skeleton height={350} />
        </div>
        <div className="col-6 col-md-3 mb-4">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (category) => {
    const updatedList = data.filter((product) => product.category === category);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="button d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>
            Jewelery
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>
            Electronic
          </button>
        </div>
        {filter.map((product) => {
          return (
            <div className="col-6 col-md-3 mb-4" key={product.id}>
              <div className="card h-100 text-center p-4">
                <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.title && product.title.length > 10 ? `${product.title.substring(0, 10)}...` : product.title}
                  </h5>
                  <p className="card-text lead fw-bold">${product.price}</p>
                  <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
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

export default Products;
