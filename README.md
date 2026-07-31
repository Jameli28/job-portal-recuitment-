# 💼 Full-Stack Job Portal Web Application
A complete end-to-end MERN stack Minimum Viable Product (MVP) for managing, posting, and searching job listings. This application features secure user authentication and persistent cloud database tracking.
## 🚀 Core Features
- **User Authentication**: Secure user registration and login using encrypted hashing and JSON Web Tokens (JWT).
- **Protected Routes**: Gated dashboard operations ensuring only authenticated users can post jobs.
- **Dynamic Dashboard**: Full frontend state engine that posts job openings and renders listings dynamically.
- **Cloud Database**: Persistent document streaming utilizing MongoDB Atlas cluster environments.
## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS v4, Axios, React Router Dom
- **Backend**: Node.js, Express.js, Cors, JSON Web Tokens (JWT)
- **Database**: MongoDB Atlas
## 📦 Local Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com
cd job-portal-recruitment
```
### 2. Configure Backend Environment
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_cryptographic_string
```
### 3. Start the Application
**Run Server:**
```bash
cd server
npm install
node server.js
```
**Run Client:**
```bash
cd client
npm install
npm run dev
```