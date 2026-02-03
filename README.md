🎓 Full Scholarship Management System

A full-stack web application designed to manage scholarship programs efficiently.
The system allows students to apply for scholarships online while administrators can manage applications, users, and scholarship data through a secure dashboard.

📌 Project Description

The Full Scholarship Management System is a modern web-based platform built using React, Node.js, Express, and MongoDB.
It provides an easy-to-use interface for students to browse and apply for scholarships, and a powerful admin panel for managing applications and users.

The project follows a client–server architecture, with a RESTful API handling backend logic and a responsive React frontend for user interaction.

✨ Features
👤 User Features

User registration and login (JWT authentication)

Browse available scholarships

Apply for scholarships online

View application status

Secure logout

🛠️ Admin Features

Admin authentication

Create, update, and delete scholarships

View all student applications

Approve or reject applications

Manage users

🔐 Security & Performance

JWT-based authentication

Password hashing with bcrypt

Protected API routes

Environment variable support using dotenv

CORS and Helmet for enhanced security

🧰 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router DOM

Axios

Framer Motion

React Toastify

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT (JSON Web Tokens)

bcryptjs

Nodemailer

📁 Project Structure
full_scholarship/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Database & environment config
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & error handling
│   │   └── server.js     # Server entry point
│   ├── package.json
│   └── .env
│
├── my-react-app/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API services
│   │   ├── context/      # Auth & global state
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Setup Instructions
✅ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

MongoDB (local or Atlas)

npm or yarn
