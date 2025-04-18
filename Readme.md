
###We reccomend to use it with 2 deviced
## Setup Instructions

1. Clone the repository
2. Install dependencies:
```sh
cd client && npm install
cd ../server && npm install
```

3. Configure environment variables
4. Start MongoDB server
5. Run the application:
```sh
# Start backend server
cd server
npm start

# Start frontend development server
cd client
npm run dev
```

# Real-Time Chat Application

A full-stack chat application built with React, Node.js, Socket.IO, and MongoDB that enables real-time messaging, video calls, and friend management.

## Technology Stack

### Frontend
- React (v19)
- Socket.IO Client
- Tailwind CSS
- Vite
- React Router Dom
- Axios

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt
- Cookie Parser

## Key Features
- Real-time messaging
- Video calling
- Friend request system
- User authentication
- Online/Offline status
- Typing indicators
- Message history
- Responsive design

## Component Overview

### Frontend Components

#### App.jsx
- Main application component
- Handles routing and authentication state
- Manages socket connection
- Controls user sessions

#### Chat.jsx
- Main chat interface
- Displays online/offline friends
- Shows chat history
- Handles real-time message updates
- Responsive layout for mobile/desktop

#### Chatextended.jsx
- Individual chat window component
- Real-time message exchange
- Typing indicators
- Message history display
- Scroll management

#### User.jsx
- User profile management
- Friend request handling
- User search functionality
- Display of friend lists

#### Caller.jsx
- Working...

#### Login.jsx & SignUp.jsx
- User authentication forms
- Input validation
- Error handling
- JWT token management

### Backend Components

#### Server (index.js)
- Express server setup
- Socket.IO implementation
- Route management
- Database connection
- Real-time event handling

#### Models
- **UserModel**: User data schema
- **ChatModel**: Message storage schema
- **DataAssociator**: Relationship management schema

#### Routes
- Authentication endpoints
- Chat history endpoints
- User management endpoints

## Features in Detail

### Authentication
- JWT-based authentication
- Secure password hashing
- Session management
- Cookie-based token storage

### Real-time Communication
- Socket.IO for instant messaging
- Typing indicators
- Online status updates
- Friend request notifications

### Chat Features
- Private messaging
- Message history
- Last message preview
- User search
- Online/Offline status

### Video Calling
- Peer-to-peer connection
- Real-time video/audio
- Call notifications
- Connection state management




## API Endpoints

### Authentication
- POST /signin - Register new user
- POST /login - User login
- POST /logout - User logout
- POST /isLoggedIn - Check auth status

### Chat
- POST /api/chat - Get chat history
- Socket events for real-time messaging

## Future Enhancements
- Group chat functionality
- Message encryption
- User blocking