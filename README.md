# Product Category Browsing Application

A full-stack web application that enables users to browse products grouped by categories.

## Features

- **Category Navigation**: Browse products by selecting from a list of categories
- **Product Listing**: View products with details including name, description, price, and image
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Clean backend API for category and product queries

## Architecture

### Backend
- **Technology**: Node.js with Express
- **Database**: SQLite3
- **API Endpoints**:
  - `GET /api/categories` - Fetch all categories
  - `GET /api/categories/:id` - Fetch a specific category
  - `GET /api/products` - Fetch all products
  - `GET /api/products?category=:id` - Fetch products by category

### Frontend
- **Technology**: React 18
- **Components**:
  - CategoryNavigation - Sidebar for category selection
  - ProductList - Grid display of products
  - App - Main application component with state management

### Database Schema

**Categories Table:**
- id (INTEGER, PRIMARY KEY)
- name (TEXT)
- description (TEXT)
- created_at (DATETIME)

**Products Table:**
- id (INTEGER, PRIMARY KEY)
- name (TEXT)
- description (TEXT)
- price (DECIMAL)
- category_id (INTEGER, FOREIGN KEY)
- image_url (TEXT)
- created_at (DATETIME)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend API will be running at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## Usage

1. Start both the backend and frontend servers (in separate terminals)
2. Open your browser to `http://localhost:3000`
3. Click on different categories in the sidebar to filter products
4. Click "All Products" to view all products across all categories

## Project Structure

```
Test-repo/
├── backend/
│   ├── server.js          # Express server setup
│   ├── db.js              # Database connection and queries
│   ├── database.sql       # Database schema and seed data
│   ├── package.json       # Backend dependencies
│   └── products.db        # SQLite database (auto-generated)
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryNavigation.js
│   │   │   ├── CategoryNavigation.css
│   │   │   ├── ProductList.js
│   │   │   └── ProductList.css
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # App styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── .gitignore
└── README.md
```

## API Documentation

### Get All Categories
```
GET /api/categories
Response: Array of category objects
```

### Get Category by ID
```
GET /api/categories/:id
Response: Single category object
```

### Get All Products
```
GET /api/products
Response: Array of product objects
```

### Get Products by Category
```
GET /api/products?category=:categoryId
Response: Array of product objects filtered by category
```

## Technologies Used

- **Backend**: Node.js, Express, SQLite3, CORS
- **Frontend**: React 18, CSS3
- **Development**: npm, create-react-app

## Future Enhancements

- Add shopping cart functionality
- Implement product search
- Add product detail pages
- User authentication and profiles
- Product reviews and ratings
- Advanced filtering (price range, sorting)
