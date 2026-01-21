import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryNavigation from './components/CategoryNavigation';
import ProductList from './components/ProductList';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    try {
      setLoading(true);
      const url = categoryId 
        ? `/api/products?category=${categoryId}`
        : '/api/products';
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return 'All Products';
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.name : 'All Products';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Category Browser</h1>
      </header>
      
      <div className="container">
        <CategoryNavigation 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <main className="main-content">
          <h2>{getSelectedCategoryName()}</h2>
          
          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <ProductList products={products} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
