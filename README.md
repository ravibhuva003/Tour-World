# 🌍 Tour World

Tour World is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to discover, search, and book travel tours across the globe.

## ✨ Features

- **User Authentication**: Secure Login & Registration using JWT (JSON Web Tokens) with encrypted passwords. Includes "Forgot Password" functionality.
- **Dynamic Tour Browsing**: Browse over 400 diverse tours fetched dynamically from a MongoDB database, complete with elegant pagination.
- **Advanced Search**: Instantly find your perfect trip by searching destinations based on City, Distance, and Max Group Size.
- **Booking System**: Select a tour, set your group size, and instantly calculate the total price including service fees to secure your spot.
- **User Dashboard**: A personalized profile page where users can manage their bookings, cancel trips, and download detailed PDF Invoices.
- **Reviews & Ratings**: Logged-in users can leave public ratings and comments on specific tours.
- **Responsive Modern Design**: Built with Vite, Reactstrap, and Tailwind CSS for a seamless, beautiful experience on both desktop and mobile devices.

## 🚀 Technologies Used

- **Frontend**: React (Vite), Tailwind CSS, Reactstrap, React Router DOM, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, bcryptjs, CORS
- **Deployment Ready**: Fully configured for Vercel (Frontend) and Render (Backend).

## 💻 How to Run Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ravibhuva003/Tour-World.git
cd Tour-World
```

### 2. Backend Setup
Open a terminal and navigate to the backend directory:
```bash
cd backend
```
Install all backend dependencies:
```bash
npm install
```
Create a `.env` file in the `backend` folder and add your environment variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_super_secret_key
```
Start the backend server:
```bash
npm start
```
*Your backend will be running at `http://localhost:8000`*

### 3. Frontend Setup
Open a **new** terminal window and navigate to the frontend directory:
```bash
cd frontend
```
Install all frontend dependencies:
```bash
npm install
```
*(Note: If you run into any peer dependency errors, run `npm install --legacy-peer-deps`)*

Create a `.env` file in the `frontend` folder to connect to your local backend:
```env
VITE_BASE_URL=http://localhost:8000/api/v1
```
Start the frontend development server:
```bash
npm run dev
```
*Your frontend will automatically open in your browser at `http://localhost:3000`*

## ☁️ Deployment

- **Frontend (Vercel)**: Connect your GitHub repo to Vercel. Vercel will automatically detect the Vite framework. Add your `VITE_BASE_URL` environment variable (pointing to your live Render API) and deploy. The included `vercel.json` and `.npmrc` files will handle routing and dependency conflicts automatically.
- **Backend (Render)**: Connect your GitHub repo to Render as a "Web Service". Set the Root Directory to `backend`, Build Command to `npm install`, and Start Command to `npm start`. Add your `MONGO_URI`, `JWT_SECRET_KEY`, and `PORT` to the Environment Variables.
