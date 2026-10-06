
# 🍽️ VNREats — Multi-Cuisine Restaurant Management System

VNREats is a full-stack **MERN-based Restaurant Management and Food Ordering System** designed to provide a complete digital platform for customers and restaurant administrators.

The project was originally developed as a JSP/Java/MySQL-based restaurant management system and was redesigned and implemented using the **MERN stack** to provide a modern, scalable, and interactive web application.

---

## 📌 Project Overview

VNREats provides two primary interfaces:

### 👤 Customer

Customers can:

- Browse the restaurant menu
- Filter dishes by category
- Search and select dishes for an order
- Adjust item quantities
- Place food orders
- Check table availability
- Make table reservations
- Rate their restaurant experience
- Leave optional feedback

### 👨‍💼 Administrator

Administrators can:

- View and manage the restaurant menu
- Add new dishes
- Edit existing dishes
- Delete dishes
- Search for menu items
- Filter menu items by category
- Automatically assign dish numbers
- Detect duplicate menu items
- View customer orders
- Update order statuses
- View customer reservations
- Cancel reservations

---

# ✨ Features

## 🍽️ Menu Management

The customer-facing menu provides a categorized view of all available dishes.

Supported categories:

- Breakfast
- Appetizer
- Main Course
- Dessert
- Beverage

Each menu item contains:

- Dish Number
- Dish Name
- Category
- Cuisine
- Price

Customers can switch between categories to quickly find dishes.

---

## 🛒 Food Ordering

Customers can place orders directly through the application.

### Ordering functionality

- Browse available dishes
- Filter dishes by category
- Increase or decrease quantities
- View selected items
- Automatically calculate the total price
- Submit the order to the backend
- Store the complete order in MongoDB

Each order stores:

- Ordered dishes
- Quantity of each dish
- Price at the time of ordering
- Total order amount
- Order status
- Order creation timestamp

### Order Statuses

Administrators can update an order through the following states:

```text
Pending
   ↓
Confirmed
   ↓
Preparing
   ↓
Ready
   ↓
Completed
```

Orders can also be marked as:

```text
Cancelled
```

---

# 🪑 Table Reservation System

VNREats includes a table reservation system that dynamically determines which tables are suitable for a customer's requirements.

Customers provide:

- Name
- Phone number
- Date
- Time
- Number of guests

The system then:

1. Finds tables capable of accommodating the requested number of guests.
2. Checks existing reservations for the requested date and time.
3. Removes already reserved tables.
4. Displays the remaining available tables.
5. Allows the customer to select a table.
6. Stores the reservation in MongoDB.

### Example

If a customer requests:

```text
Date: 2026-10-10
Time: 19:00
Guests: 5
```

The system only displays tables with a capacity of **5 or more** that are not already reserved at that time.

The project currently contains tables with capacities of:

```text
2 people
4 people
6 people
8 people
```

---

# ⭐ Rating and Feedback

Customers can rate their VNREats experience using a **1–5 star rating system**.

Customers may also provide an optional comment.

Ratings are stored in MongoDB and can be retrieved through the backend API.

---

# 👨‍💼 Administrator Features

## 📋 Menu Administration

Administrators have complete CRUD functionality for menu items.

### Add Dish

Administrators can provide:

- Category
- Dish Name
- Cuisine
- Price

Dish numbers are automatically generated using:

```text
Highest Existing Dish Number + 1
```

This eliminates the need to manually track dish numbers.

### Edit Dish

Existing menu items can be edited directly from the administration interface.

### Delete Dish

Administrators can remove dishes from the menu after confirmation.

### Search

The menu administration page includes a search bar that can search by:

- Dish name
- Cuisine
- Dish number

### Category Filtering

Administrators can filter menu items using:

```text
All
Breakfast
Appetizer
Main Course
Dessert
Beverage
```

### Duplicate Detection

Before adding a new dish, the system checks whether a dish with the same:

```text
Dish Name + Cuisine
```

already exists.

This helps prevent accidental duplicate entries.

---

# 📦 Order Administration

Administrators can view all customer orders.

Each order displays:

- Order ID
- Order creation date/time
- Ordered dishes
- Quantities
- Individual item totals
- Overall order total
- Current order status

Administrators can update the order status directly from the dashboard.

---

# 📅 Reservation Administration

Administrators can view all active reservations.

Each reservation displays:

- Customer name
- Phone number
- Reservation ID
- Date
- Time
- Number of guests
- Assigned table
- Table capacity

Administrators can also cancel reservations.

Cancelling a reservation automatically makes the corresponding table available again for that date and time.

---

# 🏗️ System Architecture

VNREats follows a client-server architecture using the MERN stack.

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │                      │
                    │  Customer Interface  │
                    │  Admin Interface     │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │                      │
                    │  API Routes          │
                    │  Business Logic      │
                    │  Validation          │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │                      │
                    │  Menu                │
                    │  Orders              │
                    │  Reservations        │
                    │  Tables              │
                    │  Ratings             │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Axios

## Backend

- Node.js
- Express.js
- JavaScript
- REST APIs
- CORS
- dotenv

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

# 📁 Project Structure

```text
VNREats/
│
├── .gitignore
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── MenuCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── Reservation.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminMenu.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── AdminReservations.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Menu.js
│   │   ├── Order.js
│   │   ├── Reservation.js
│   │   ├── Table.js
│   │   └── Rating.js
│   │
│   ├── routes/
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reservationRoutes.js
│   │   └── ratingRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── seedMenu.js
│   ├── seedTables.js
│   └── server.js
│
└── README.md
```

---

# 🗄️ Database Design

VNREats uses MongoDB with Mongoose schemas.

## Menu

The Menu collection stores restaurant dishes.

```text
Menu
├── dishno
├── category
├── dishname
├── cuisine
├── price
└── timestamps
```

---

## Order

The Order collection stores customer orders.

```text
Order
├── items
│   ├── dishId
│   ├── dishname
│   ├── quantity
│   └── price
│
├── totalAmount
├── status
└── timestamps
```

---

## Table

The Table collection represents physical restaurant tables.

```text
Table
├── tableNumber
├── capacity
└── timestamps
```

---

## Reservation

The Reservation collection stores table reservations.

```text
Reservation
├── tableId
├── customerName
├── phoneNumber
├── date
├── time
├── numberOfGuests
└── timestamps
```

---

## Rating

The Rating collection stores customer feedback.

```text
Rating
├── rating
├── comment
└── timestamps
```

---

# 🔌 REST API

## Menu API

### Get all menu items

```http
GET /api/menu
```

### Add a menu item

```http
POST /api/menu
```

### Update a menu item

```http
PUT /api/menu/:id
```

### Delete a menu item

```http
DELETE /api/menu/:id
```

---

## Order API

### Place an order

```http
POST /api/orders
```

### Get all orders

```http
GET /api/orders
```

### Update order status

```http
PUT /api/orders/:id/status
```

---

## Reservation API

### Get available tables

```http
GET /api/reservations/available
```

Query parameters:

```text
date
time
guests
```

Example:

```text
/api/reservations/available?date=2026-10-10&time=19:00&guests=5
```

### Create reservation

```http
POST /api/reservations
```

### Get all reservations

```http
GET /api/reservations
```

### Update reservation

```http
PUT /api/reservations/:id
```

### Delete reservation

```http
DELETE /api/reservations/:id
```

---

## Rating API

### Submit rating

```http
POST /api/ratings
```

### Get ratings

```http
GET /api/ratings
```

---

## Tables API

### Get all restaurant tables

```http
GET /api/tables
```

---

# 🚀 Installation and Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/saigowtham1606/VNREats.git
```

Navigate into the project:

```bash
cd VNREats
```

---

# ⚙️ Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the MongoDB URI with your own MongoDB Atlas connection string.

Start the backend:

```bash
node server.js
```

The backend should run on:

```text
http://localhost:5000
```

---

# 🌱 Database Seeding

VNREats includes scripts for generating the initial menu and restaurant tables.

### Seed menu

From the `server` directory:

```bash
node seedMenu.js
```

### Seed tables

```bash
node seedTables.js
```

The project includes a preconfigured set of restaurant tables with different seating capacities.

---

# 💻 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, typically:

```text
http://localhost:5173
```

---

# 🔄 Running the Complete Application

VNREats requires both the frontend and backend servers to be running.

### Terminal 1 — Backend

```bash
cd server
node server.js
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Then open the frontend URL provided by Vite.

---

# 🔐 Environment Variables

The MongoDB connection string is stored in:

```text
server/.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

The `.env` file is intentionally excluded from version control.

**Do not commit database credentials or other sensitive information to GitHub.**

---

# 🔄 Application Workflow

## Customer Order Workflow

```text
Customer
   ↓
Browse Menu
   ↓
Select Category
   ↓
Select Dishes
   ↓
Set Quantities
   ↓
Review Order
   ↓
Place Order
   ↓
Express API
   ↓
MongoDB
   ↓
Order Stored
```

---

## Reservation Workflow

```text
Customer
   ↓
Enter Date / Time / Guests
   ↓
Find Available Tables
   ↓
Backend Checks Table Capacity
   ↓
Backend Checks Existing Reservations
   ↓
Available Tables Returned
   ↓
Customer Selects Table
   ↓
Reservation Created
   ↓
MongoDB
```

---

## Admin Order Workflow

```text
Customer Places Order
          ↓
       MongoDB
          ↓
   Admin Order Dashboard
          ↓
      Pending
          ↓
      Confirmed
          ↓
      Preparing
          ↓
        Ready
          ↓
      Completed
```

---

# 🧪 Testing

The application was tested across the major customer and administrator workflows.

### Customer-side testing

- Menu retrieval
- Menu category filtering
- Order creation
- Quantity updates
- Total calculation
- Reservation availability
- Reservation creation
- Reservation deletion
- Rating submission

### Administrator testing

- Menu retrieval
- Menu category filtering
- Menu search
- Menu creation
- Automatic dish numbering
- Duplicate dish detection
- Menu editing
- Menu deletion
- Order retrieval
- Order status updates
- Reservation retrieval
- Reservation cancellation

### Integration testing

The following workflows were also tested across the frontend, backend, and database:

```text
Customer → Order → MongoDB → Admin
```

```text
Customer → Reservation → MongoDB → Admin
```

```text
Admin → Menu Update → MongoDB → Customer Menu
```

---

# 🎯 Project Objectives

The primary objectives of VNREats are to:

- Digitize restaurant menu management
- Simplify customer food ordering
- Provide an interactive table reservation system
- Centralize restaurant order management
- Allow customers to provide feedback
- Provide administrators with convenient CRUD operations
- Demonstrate full-stack web development using the MERN stack
- Replace a traditional JSP/Java/MySQL architecture with a modern JavaScript-based stack

---

# 🔮 Future Improvements

Potential future enhancements include:

- 🔐 Administrator authentication and authorization
- 👤 Customer accounts and authentication
- 💳 Online payment integration
- 📦 Order history for customers
- 🔔 Real-time order status notifications
- 📊 Admin analytics dashboard
- ⭐ Advanced rating and review management
- 📱 Improved mobile-first interface
- 🧾 Digital invoices and receipts
- 📧 Email/SMS reservation confirmations
- 🖼️ Dish images and richer menu presentation
- ☁️ Production deployment
- 🔒 More comprehensive backend validation and security

---

# 📚 Project Background

VNREats was developed as a restaurant management system project focusing on the interaction between customers, restaurant menu management, food ordering, reservations, and administrative operations.

The original system was based on Java/JSP and MySQL. The project was redesigned using the MERN stack to provide a component-based frontend, RESTful backend services, and a document-oriented MongoDB database.

---

# 👨‍💻 Developer

**Gowtham Sai Tammineni**

B.Tech — Artificial Intelligence & Machine Learning

VNR Vignana Jyothi Institute of Engineering and Technology


