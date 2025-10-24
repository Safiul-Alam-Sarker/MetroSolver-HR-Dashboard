# MetroSolver-HR-Dashboard

Metro Solver - Full Stack Task Management Application
https://img.shields.io/badge/Metro-Solver-blue
https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/TypeScript-5.0.2-blue
https://img.shields.io/badge/Node.js-Express-green
https://img.shields.io/badge/MongoDB-Database-green

A modern, full-stack task and meeting management application built with React TypeScript frontend and Express.js backend with MongoDB.

🚀 Features
🔐 Authentication & User Management
User Registration & Login with JWT authentication

Profile Management with image upload support

Protected Routes with automatic token validation

Persistent Sessions with localStorage

📅 Task Management
Create Tasks with detailed information (title, description, due date, priority)

Assign Members to tasks

Label System for task categorization

File Attachments with ImageKit integration

Priority Levels (Urgent, High, Normal, Low)

Status Tracking (Pending, In Progress, Completed, Cancelled)

🎯 Meeting Scheduling
Schedule Meetings with date, time, and duration

Multiple Platforms support (Zoom, Google Meet, Slack, Teams, etc.)

Conversation Types (Video, Audio, Message)

Participant Management with member selection

Meeting Links integration

Calendar View with weekly scheduling

📊 Dashboard & Calendar
Interactive Calendar with weekly view

Visual Task Display with color-coded events

Real-time Updates with automatic refresh

Today's Overview with meeting and task counts

Responsive Design for all devices

🛠 Tech Stack
Frontend
React 18 with TypeScript

Redux Toolkit for state management

React Router for navigation

Tailwind CSS for styling

Axios for API calls

React Hot Toast for notifications

Lucide React for icons

Backend
Node.js with Express.js

MongoDB with Mongoose ODM

JWT for authentication

bcrypt for password hashing

multer for file uploads

ImageKit for image storage

CORS enabled for frontend communication

📦 Installation
Prerequisites
Node.js (v16 or higher)

MongoDB (local or Atlas)

ImageKit account (for image storage)

1. Clone the Repository
bash
git clone https://github.com/your-username/metro-solver.git
cd metro-solver
2. Backend Setup
bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env file with your values
3. Frontend Setup
bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env file with your values
⚙️ Configuration
Backend Environment Variables (backend/.env)
env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/metro-solver
JWT_SECRET=your-super-secret-jwt-key-here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
Frontend Environment Variables (frontend/.env)
env
VITE_BASEURL=http://localhost:3000/api
VITE_APP_NAME=Metro Solver
🚀 Running the Application
Development Mode
Start Backend Server

bash
cd backend
npm run dev
Server runs on: http://localhost:3000

Start Frontend Development Server

bash
cd frontend
npm run dev
Frontend runs on: http://localhost:5173

Production Build
bash
# Build frontend
cd frontend
npm run build

# Start production server (backend)
cd ../backend
npm start
📁 Project Structure
text
metro-solver/
├── backend/
│   ├── config/          # Database and external service configs
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth and upload middleware
│   ├── models/          # MongoDB models
│   ├── routers/         # API routes
│   ├── upload/          # Temporary file uploads
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── store/       # Redux store and slices
│   │   ├── api/         # API configuration
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
└── README.md
🔌 API Endpoints
Authentication
POST /api/user/register - User registration

POST /api/user/login - User login

GET /api/user/data - Get user data

PUT /api/user/update - Update user profile

Tasks
POST /api/task/create - Create new task

GET /api/task/all - Get user tasks

PUT /api/task/update/:id - Update task

DELETE /api/task/delete/:id - Delete task

Meetings
POST /api/meeting/schedule - Schedule meeting

GET /api/meeting/all - Get user meetings

PUT /api/meeting/update/:id - Update meeting

DELETE /api/meeting/delete/:id - Delete meeting

🎨 UI Components
The application uses a custom component library with:

Cards for content containers

Input Groups with icons

Modals for forms and confirmations

Buttons with various styles

Calendar with interactive scheduling

Notification system with toasts

🔒 Security Features
JWT-based authentication

Password hashing with bcrypt

Protected API routes

CORS configuration

Environment variable protection

File upload validation

📱 Responsive Design
The application is fully responsive and works on:

💻 Desktop computers

📱 Mobile devices

🖥 Tablets

🚀 Deployment
Backend Deployment
The backend can be deployed to:

Heroku

Railway

Render

AWS EC2

DigitalOcean

Frontend Deployment
The frontend can be deployed to:

Vercel

Netlify

GitHub Pages

AWS S3 + CloudFront

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Your Name - Initial work - YourGitHub

🙏 Acknowledgments
React team for the amazing framework

Tailwind CSS for the utility-first CSS framework

MongoDB for the database solution

ImageKit for image storage and optimization

All contributors and testers

Metro Solver - Streamline your task and meeting management with this modern, full-stack application! 🚇✨

📞 Support
If you have any questions or need help with setup, please open an issue or contact the development team.

<div align="center">
Made with ❤️ using React, TypeScript, and Express.js

</div>
