import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryNavigation from './components/CategoryNavigation';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

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
    setSearchActive(false);
  };

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      setSearchActive(true);
      setSelectedCategory(null);
      
      const queryParams = new URLSearchParams();
      
      if (searchParams.keyword) {
        queryParams.append('keyword', searchParams.keyword);
      }
      if (searchParams.category) {
        queryParams.append('category', searchParams.category);
      }
      if (searchParams.sortBy) {
        queryParams.append('sortBy', searchParams.sortBy);
      }
      if (searchParams.sortOrder) {
        queryParams.append('sortOrder', searchParams.sortOrder);
      }
      if (searchParams.minPrice !== undefined) {
        queryParams.append('minPrice', searchParams.minPrice);
      }
      if (searchParams.maxPrice !== undefined) {
        queryParams.append('maxPrice', searchParams.maxPrice);
      }
      
      const url = `/api/products/search?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCategoryName = () => {
    if (searchActive) return 'Search Results';
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
          <SearchBar 
            onSearch={handleSearch}
            categories={categories}
          />
          
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
