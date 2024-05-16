import React, { useState, useMemo } from "react";
import { useProductData } from "../../hooks/useProductData";

const ProductListing = () => {
  const { data: products, refetch } = useProductData();
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered products based on the search query
  const filteredProducts = useMemo(() => {
    return products?.data?.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="container mt-4 min-vh-100">
      <div className="row">
        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4" key={product?._id}>
              <a
                href={`/product/${product?._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card">
                  <img
                    src={product?.image}
                    className="card-img-top"
                    alt={product?.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product?.name}</h5>
                    <p className="card-text">{product?.description}</p>
                    <h6>Rs.{product?.price}</h6>
                    <p>Available Stock: {product?.countInStock}</p>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
