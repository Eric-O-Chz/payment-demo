# Payment Demo Playground

**A full-stack developer sandbox to explore modern payment, authentication, and order management flows in Next.js (frontend) and Express (backend) with Stripe integration.**

---

## 🛠 Purpose

This project is a safe, realistic demo environment for developers to experiment with building and integrating:
- Stripe-powered payment flows
- User authentication (register/login/logout)
- Product catalog and checkout
- Order management/history

> **No real money is required or exchanged. All data is sample/mock for developer testing.**

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, Framer Motion (animations)
- **Backend:** Express.js, Node.js, MongoDB, Stripe SDK
- **Stripe** integration for payment intents and webhooks
- **React Hot Toast** for real-time notifications

---

## ✨ Key Features

- Developer-friendly UI with modern animations and sample data
- Register/login/logout with mock authentication
- Browse a catalog of products, add to cart, and check out
- Stripe-based test payments (payment _intents_)
- Your order history in a friendly order page
- All interfaces animated for a real-world app feel

---

## ⚡ Quickstart

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd payment-demo
```

### 2. Setup & Run Backend

```bash
cd backend
npm install
# Environment variables required, see backend/.env.example
npm run dev
```

### 3. Setup & Run Frontend

```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:5000](http://localhost:5000)

---

## 🧪 How to Play
- Try registering a new user or logging in
- Browse Products, "Buy Now" as much as you want
- Use Stripe test cards (`4242 4242 4242 4242` etc.)
- Orders appear in My Orders; statuses are mock/test

---

## 📚 For Developers
- UI/UX intentionally polished with animation to give a real-world feel
- No real transactions happen—great for demos, onboarding, and experimenting

---

## 📄 Original Next.js README

...removed for brevity; find Next.js docs at [nextjs.org](https://nextjs.org/)

Deleted for fontend next.js app for fan.should create next.js app and copy it.folder structure should be like this.
backend is the same.but most of them are written as references.




/payment-demo
├── .gitignore          # Root gitignore
├── /backend            # Express.js Application
│   ├── .env            # <-- STAYS SECRET (Stripe keys, DB string, JWT secret)
│   ├── .gitignore
│   ├── package.json
│   └── /src
│       ├── /config       # DB connection (mongoose.js)
│       ├── /controllers  # Logic (authController.js, productController.js, orderController.js)
│       ├── /middleware   # (authMiddleware.js - checks JWT)
│       ├── /models       # Mongoose schemas (User.js, Product.js, Order.js)
│       ├── /routes       # API routes (auth.js, products.js, checkout.js, webhooks.js)
│       └── server.js     # Main Express server file
│
└── /frontend           # Next.js Application
    ├── .env.local      # <-- STAYS SECRET (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    ├── /src
    │   ├── /app
    │   │   ├── /products
    │   │   │   └── page.js         # Show all products
    │   │   ├── /profile
    │   │   │   └── /orders
    │   │   │       └── page.js     # (Protected) Show user's order history
    │   │   ├── /login
    │   │   │   └── page.js
    │   │   ├── /register
    │   │   │   └── page.js
    │   │   ├── layout.js         # Root layout
    │   │   └── page.js           # Home page
    │   │
    │   ├── /components
    │   │   ├── CheckoutForm.js   # The Stripe <PaymentElement> component
    │   │   ├── ProductCard.js
    │   │   └── Navbar.js
    │   │
    │   ├── /lib
    │   │   ├── api.js            # Central file for all axios/fetch calls
    │   │   └── stripe.js         # Load Stripe.js (loadStripe)
    │   │
    │   └── /context
    │       └── AuthContext.js    # Manages user state and JWT token
    │
    └── (other next.js files)

<img width="1121" height="825" alt="Screenshot 2025-10-30 121423" src="https://github.com/user-attachments/assets/fc0e8fae-251a-4271-9834-6f15b630fa53" />




