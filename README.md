# Backend Setup Instructions

## Project Description
This backend application provides APIs for managing a menu and placing orders. It is part of a larger application that includes user authentication, menu management, and order placement. The backend is built using Node.js, Express, and MongoDB, and uses Mongoose as an ODM (Object Data Modeling) library.

### Features:
- **Menu Management:**
  - Add new menu items.
  - Update existing menu items.
  - Delete menu items.
  - Fetch a paginated list of menu items.

- **Order Management:**
  - Place an order with selected menu items and quantities.
  - Fetch all orders for a logged-in user.

- **User Authentication:**
  - Register and login functionality for users.
  - User authentication is handled using JWT tokens (middleware required).

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Steps to Set Up the Backend

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Start the Server:**
   ```bash
   npm start
   # or
   yarn start
   ```
   By default, the server runs on `http://localhost:5000`.

5. **Test the APIs:**
   Use a tool like Postman or cURL to test the available endpoints.

---

## Endpoints

### Menu Management:
- **GET** `/menu` - Fetch paginated menu items (query parameters: `page`, `itemsPerPage`).
- **POST** `/menu` - Add a new menu item.
- **PUT** `/menu/:id` - Update an existing menu item .
- **DELETE** `/menu/:id` - Delete a menu item .

### Order Management:
- **POST** `/order` - Place an order.
- **GET** `/orders` - Fetch all orders for a logged-in user.

### Authentication:
- **POST** `/register` - Register a new user.
- **POST** `/login` - Login an existing user.

---

## Assumptions, Challenges, and Limitations

### Assumptions:
- **Authentication:**
  - User authentication is implemented via JWT tokens, and the `userId` is extracted by middleware. This middleware must be set up separately.
- **Menu Items:**
  - All menu items have fixed categories (“Appetizers,” “Main Course,” “Desserts”).
  - Menu item prices are provided in the request and are not dynamically calculated.

### Challenges:
- Ensuring robust validation for user input (e.g., valid menu IDs, positive quantities).
- Handling edge cases such as unavailable menu items or missing fields in the request body.

### Limitations:
- **Order Deletion:**
  - There is no endpoint to delete an order for now.
- **Complex Business Logic:**
  - No support for complex pricing rules, discounts, or promotions.
- **Scalability:**
  - No caching or load balancing implemented, which might affect performance under heavy loads.

---

If you face any issues or have suggestions, feel free to contribute or raise an issue in the repository!

