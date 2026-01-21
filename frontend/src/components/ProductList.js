import React from 'react';
import './ProductList.css';

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <span className="product-price">${product.price}</span>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
