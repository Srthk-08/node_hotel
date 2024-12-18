const mongoose = require('mongoose');

// Define the mongoDb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up mongoDb connection
mongoose.connect(mongoURL,{
useNewUrlParser: true,
useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;


// Define event listeners for database connection
db.on('connected',()=>{
  console.log('Connected to MongoDB server');
})

db.on('error', () => {
  console.log('MongoDB connection error:',error);
})

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
})


// Export the database connection 
module.exports = db;      