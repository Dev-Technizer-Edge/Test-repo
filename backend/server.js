const express = require('express');
const cors = require('cors');
const { initDatabase, getCategories, getProductsByCategory, getCategoryById, searchProducts } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Initialize database
initDatabase()
  .then((database) => {
    db = database;
    console.log('Database initialized successfully');
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await getCategories(db);
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get category by ID
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await getCategoryById(db, req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Get products by category (or all products if no category specified)
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const products = await getProductsByCategory(db, category);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Search products with filters and sorting
app.get('/api/products/search', async (req, res) => {
  try {
    const { keyword, category, sortBy, sortOrder, minPrice, maxPrice } = req.query;
    
    const options = {
      keyword: keyword || '',
      categoryId: category,
      sortBy: sortBy || 'name',
      sortOrder: sortOrder || 'asc',
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
    };
    
    const products = await searchProducts(db, options);
    res.json(products);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
