# DevConnect

A Trello-style task board for managing your projects and to-dos.

Live Demo: [https://devconnect-ijff.onrender.com](https://devconnect-ijff.onrender.com)

---

## Features

- Full-stack app with React + Node.js + MongoDB
- Task boards with columns and cards
- JWT Authentication (Register/Login)
- Drag & Drop support (removed temporarily for stability)
- Optimistic UI updates for fast interactions
- Responsive and minimal UI built with TailwindCSS
- State management via Redux Toolkit
- ESLint and Prettier configured for clean code

---

## Tech Stack

**Frontend**: React, Redux Toolkit, Vite, TailwindCSS  
**Backend**: Node.js, Express, MongoDB (Mongoose)  
**Tooling**: ESLint, Prettier, Render for deployment

---

## Running Locally

1. Clone the backend: [devconnect-back](https://github.com/gmartirosyan-bash/devconnect-back)
2. Replace <username> and <password> with your MongoDB Atlas credentials in devconnect-back
MONGO_DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/devconnect?retryWrites=true&w=majority
3. Clone the frontend:
```bash
git clone https://github.com/yourname/devconnect-front
cd devconnect-front
npm install
npm run dev
