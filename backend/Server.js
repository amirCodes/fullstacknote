// server.js
// Save here as reference : https://github.com/amirCodes/starter-express-api
// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World! this is my server and so on  \n  Did you get what i mean > \n now we dont need to restart \n Yess correct\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

// // run with `node server.js`
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/dbconfig');
const noteRoutes = require('./routes/NoteRoute');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? '*' 
    : ['http://localhost:5000','http://localhost:3000','http://192.168.100.28:5000','http://192.168.100.28:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/notes', noteRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : {}
//   });
// });
console.log("*******here we ok ***********")

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
