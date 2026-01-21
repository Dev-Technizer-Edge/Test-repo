const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'products.db');

// Initialize database
function initDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Read and execute schema
      const schema = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
      
      db.exec(schema, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(db);
      });
    });
  });
}

// Get all categories
function getCategories(db) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories ORDER BY name', [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Get products by category
function getProductsByCategory(db, categoryId) {
  return new Promise((resolve, reject) => {
    const query = categoryId
      ? 'SELECT * FROM products WHERE category_id = ? ORDER BY name'
      : 'SELECT * FROM products ORDER BY name';
    
    const params = categoryId ? [categoryId] : [];
    
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Get category by ID
function getCategoryById(db, categoryId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM categories WHERE id = ?', [categoryId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

module.exports = {
  initDatabase,
  getCategories,
  getProductsByCategory,
  getCategoryById
};
