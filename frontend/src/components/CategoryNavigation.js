import React from 'react';
import './CategoryNavigation.css';

function CategoryNavigation({ categories, selectedCategory, onCategorySelect }) {
  return (
    <nav className="category-navigation">
      <h3>Categories</h3>
      <ul className="category-list">
        <li 
          className={selectedCategory === null ? 'category-item active' : 'category-item'}
          onClick={() => onCategorySelect(null)}
        >
          <span className="category-name">All Products</span>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={selectedCategory === category.id ? 'category-item active' : 'category-item'}
            onClick={() => onCategorySelect(category.id)}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-description">{category.description}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNavigation;
