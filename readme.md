# Fullstack Store Rating App

This is a fullstack web application built with **Node.js**, **Express**, and **React**. It allows managing store ratings and involves role-based data interaction via APIs.

## 🛠️ Tech Stack

- Backend: Node.js + Express
- Frontend: React (Vite or CRA)
- Database: MySQL (via MySQL Workbench)

---

## 📦 Project Structure

```

store-rating-app/
├── backend/      # Express + Sequelize API
├── frontend/     # React application
└── README.md

```

---

## 🔧 Prerequisites

- Node.js (v16+ recommended)
- MySQL Workbench / MySQL Server
- npm (v7+)

---

## 🗄️ Database Setup

1. Open **MySQL Workbench**.
2. Run the following SQL to create the database:

```sql
CREATE DATABASE store_rating_db;
```

> Make sure the database connection details in `backend/config/db.js` match local MySQL credentials.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RajatGayakwad15/task-store-rating.git
cd task-store-rating
```

### 2. Backend Setup (Node + Express)

```bash
cd backend
npm install
npm start
```

The backend will start on [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) (or the default port from your dev server).

---

## Admin Credential

Email: admin@gmail.com  
Password: Admin@123

## Store Credential

email: apple@gmail.com
password: Apple@123

## User Credential

email: textuser@gmail.com
password: User@123
   

## 📬 Notes

- Make sure the backend is running before starting the frontend.
- The app uses Sequelize for database interaction, with models, migrations, and seeds as needed.

---

## ✅ Ready for Review

This project is structured and ready for review as a fullstack assignment.
