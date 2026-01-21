import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, categories }) {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const searchParams = {
      keyword,
      category: selectedCategory,
      sortBy,
      sortOrder,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
    };
    
    onSearch(searchParams);
  };

  const handleClear = () => {
    setKeyword('');
    setSelectedCategory('');
    setSortBy('name');
    setSortOrder('asc');
    setMinPrice('');
    setMaxPrice('');
    
    onSearch({
      keyword: '',
      category: '',
      sortBy: 'name',
      sortOrder: 'asc',
      minPrice: undefined,
      maxPrice: undefined
    });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
          <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
          <button 
            type="button" 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="filters">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created_at">Newest</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Order:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Min Price:</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$0.00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Max Price:</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$999.99"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
