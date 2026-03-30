# 🍔 Food Delivery Website — MERN Stack

A full-stack food delivery web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Customers can browse food items by category, search for dishes, add to cart, and place orders with Stripe payments. Admins manage food items and track orders through a dedicated dashboard.

---

## 📸 Project Structure

```
food-delivery-mern-stack/
├── admin/          # Admin dashboard (React + Vite)
├── backend/        # REST API (Node.js + Express)
├── delivery/       # Customer frontend (React + Vite)
└── package.json
```

---

## ✨ Features

### 👤 Customer Website (`/delivery`)
- User registration and login with JWT authentication
- Browse food items by category (Salad, Rolls, Pasta, Noodles, etc.)
- Real-time search bar to filter dishes by name, description, or category
- Add / remove items from cart
- Place orders with **Stripe** payment integration
- View order history with live order tracking (Food Processing → Out for Delivery → Delivered)

### 👨‍💼 Admin Panel (`/admin`)
- Add new food items with image upload
- View and manage all food listings
- View all customer orders
- Update order status (Food Processing / Out for Delivery / Delivered)

### 🖥️ Backend API (`/backend`)
- RESTful API with Express.js
- MongoDB Atlas database with Mongoose
- JWT-based authentication
- Secure password hashing with bcrypt
- Stripe payment session creation and verification
- Image upload with Multer

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Payments | Stripe |
| File Upload | Multer |
| State Management | React Context API |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account
- Stripe account

---

### 1. Clone the Repository

```bash
git clone https://github.com/omsjadhav2662005-ui/food-delivery-mern-stack.git
cd food-delivery-mern-stack
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:

```bash
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Admin Panel Setup

Open a new terminal:

```bash
cd admin
npm install
```

Create a `.env` file inside the `admin` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the admin panel:

```bash
npm run dev
```

Admin panel runs at: `http://localhost:5173`

---

### 4. Customer Frontend Setup

Open another terminal:

```bash
cd delivery
npm install
```

Create a `.env` file inside the `delivery` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Customer site runs at: `http://localhost:5174`

---

## 🌐 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new **M0 Free Cluster**
3. Under **Database Access**, create a database user with a username and password
4. Under **Network Access**, add `0.0.0.0/0` to allow all IPs (for development)
5. Click **Connect** on your cluster → **Connect your application**
6. Copy the connection string and paste it into your `backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/foodApp?retryWrites=true&w=majority
```

---

## 💳 Stripe Setup

1. Create a [Stripe](https://stripe.com) account
2. Go to **Developers → API Keys**
3. Copy the **Secret Key**
4. Add it to `backend/.env`:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login and receive JWT |

### Food
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/food/list` | Get all food items |
| POST | `/api/food/add` | Add a new food item (Admin) |
| POST | `/api/food/remove` | Remove a food item (Admin) |

### Cart
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cart/add` | Add item to cart |
| POST | `/api/cart/remove` | Remove item from cart |
| POST | `/api/cart/get` | Get user cart |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/order/place` | Place a new order |
| POST | `/api/order/verify` | Verify Stripe payment |
| POST | `/api/order/userorders` | Get orders for logged-in user |
| GET | `/api/order/list` | Get all orders (Admin) |
| POST | `/api/order/status` | Update order status (Admin) |

---

## 🗂️ Food Categories

| Category |
|---|
| Salad |
| Rolls |
| Deserts |
| Sandwich |
| Cake |
| Pure Veg |
| Pasta |
| Noodles |

---

## 🚀 Deployment

### Backend (Render / Railway)
1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set the root directory to `backend`
4. Add all `.env` variables in the Environment settings
5. Set the start command to `npm start`

### Frontend & Admin (Vercel / Netlify)
1. Import your GitHub repo on [Vercel](https://vercel.com)
2. For the **delivery** app, set the root directory to `delivery`
3. For the **admin** app, deploy separately with root directory `admin`
4. Add `VITE_BACKEND_URL` pointing to your deployed backend URL

---

## ❗ Common Issues

**`ERR_CONNECTION_REFUSED`**
Make sure the backend is running and `VITE_BACKEND_URL` in your `.env` matches the backend port (default: `5000`).

**MongoDB Authentication Failed**
Double-check the username, password, and network access settings in MongoDB Atlas.

**Stripe Payment Error**
Verify `STRIPE_SECRET_KEY` is correctly set in `backend/.env` and you're using the right key (test vs live).

**Category filter showing no results**
Make sure food items were added from the Admin panel after the category fix. Existing items saved with old lowercase categories will still work due to case-insensitive matching.

---

## 👨‍💻 Author

**Om Jadhav**
- GitHub: [@omsjadhav2662005-ui](https://github.com/omsjadhav2662005-ui)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
