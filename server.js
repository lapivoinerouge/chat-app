const express = require('express');
const path = require('path');
const app = express();
const port = '8000';

const messages = [];

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

app.listen(port || 8000, () => {
  console.log('Server is running on port: 8000');
});