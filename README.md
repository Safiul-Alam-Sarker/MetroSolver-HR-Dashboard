# Metro Solver - Full Stack Task Management Application

A modern, full-stack task and meeting management application built with React TypeScript frontend and Express.js backend with MongoDB.

## 🚀 Features

### 🔐 Authentication & User Management
- User Registration & Login with JWT authentication
- Profile Management with image upload support
- Protected Routes with automatic token validation
- Persistent Sessions with localStorage

### 📅 Task Management
- Create Tasks with detailed information
- Assign Members to tasks
- Label System for task categorization
- File Attachments with ImageKit integration
- Priority Levels (Urgent, High, Normal, Low)
- Status Tracking (Pending, In Progress, Completed, Cancelled)

### 🎯 Meeting Scheduling
- Schedule Meetings with date, time, and duration
- Multiple Platforms support (Zoom, Google Meet, Slack, Teams)
- Conversation Types (Video, Audio, Message)
- Participant Management with member selection
- Meeting Links integration
- Calendar View with weekly scheduling

### 📊 Dashboard & Calendar
- Interactive Calendar with weekly view
- Visual Task Display with color-coded events
- Real-time Updates with automatic refresh
- Today's Overview with meeting and task counts
- Responsive Design for all devices

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- multer for file uploads
- ImageKit for image storage
- CORS enabled for frontend communication

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- ImageKit account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/metro-solver.git
cd metro-solver
