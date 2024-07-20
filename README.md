# eCommerce Project Backend

This is the backend for an eCommerce project using Node.js, Express, and MongoDB.

## API 
- **Link:** `https://ecommerce-practice-chi.vercel.app/api/v1`

## API Endpoints

### 1. API Status
- **Endpoint:** `/`
- **Description:** Check if the API is working.

### 2. Product Management

#### Get All Products
- **Endpoint:** `GET /product`
- **Description:** Retrieve a list of all products.

#### Add New Product
- **Endpoint:** `POST /product`
- **Description:** Add a new product.
- **Request Body:** JSON object representing the new product.

#### Delete All Products
- **Endpoint:** `DELETE /product`
- **Description:** Delete all products from the database.

### 3. Product Operations by ID

#### Get Product by ID
- **Endpoint:** `GET /product/:id`
- **Description:** Retrieve a product by its ID.

#### Update Product by ID
- **Endpoint:** `PUT /product/:id`
- **Description:** Update a product by its ID.
- **Request Body:** JSON object representing the updated product details.

#### Delete Product by ID
- **Endpoint:** `DELETE /product/:id`
- **Description:** Delete a product by its ID.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add your MongoDB connection string and any other required environment variables.
4. Start the server using `npm start` or `nodemon` for development.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Author

- NAGARAJ S

