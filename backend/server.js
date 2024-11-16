const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory user database (to simulate MongoDB)
const users = {};

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  users[username] = password;
  return res.json({ message: 'User signed up successfully!' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    return res.json({ message: 'Login successful!' });
  }

  return res.status(401).json({ message: 'Invalid credentials!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
