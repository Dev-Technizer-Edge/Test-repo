-- Database Schema for Product Category Browsing

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER NOT NULL,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Sample Data for Categories
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Books and literature'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Sports', 'Sports equipment and accessories');

-- Sample Data for Products
INSERT INTO products (name, description, price, category_id, image_url) VALUES
    ('Laptop', 'High-performance laptop', 999.99, 1, 'https://via.placeholder.com/200?text=Laptop'),
    ('Smartphone', 'Latest model smartphone', 799.99, 1, 'https://via.placeholder.com/200?text=Smartphone'),
    ('Headphones', 'Wireless noise-canceling headphones', 249.99, 1, 'https://via.placeholder.com/200?text=Headphones'),
    ('T-Shirt', 'Cotton t-shirt', 19.99, 2, 'https://via.placeholder.com/200?text=TShirt'),
    ('Jeans', 'Denim jeans', 49.99, 2, 'https://via.placeholder.com/200?text=Jeans'),
    ('Novel', 'Bestselling fiction novel', 14.99, 3, 'https://via.placeholder.com/200?text=Novel'),
    ('Cookbook', 'Recipe collection', 24.99, 3, 'https://via.placeholder.com/200?text=Cookbook'),
    ('Garden Tools', 'Set of garden tools', 39.99, 4, 'https://via.placeholder.com/200?text=GardenTools'),
    ('Basketball', 'Official size basketball', 29.99, 5, 'https://via.placeholder.com/200?text=Basketball'),
    ('Tennis Racket', 'Professional tennis racket', 89.99, 5, 'https://via.placeholder.com/200?text=TennisRacket');
