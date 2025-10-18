const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('HR AI Portal API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/users', userRoutes);

// TODO: Add other routes here

module.exports = app;
