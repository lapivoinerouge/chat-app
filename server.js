const express = require('express');
const path = require('path');
const app = express();
const port = '8000';
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

const server = app.listen(port || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Id: ' + socket.id);
    let user = '';
    socket.on('login', (username) => {
        console.log('New user just logged in: ' + username);
        user = username;
        users.push({ name: user, id: socket.id });
        socket.broadcast.emit('addUser', user);
    });
    socket.on('message', (message) => { 
        console.log('New message from: ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => { 
        console.log('Oh, socket ' + socket.id + ' has left');
        const idx = users.map(o => o.id).indexOf(socket.id);
        users.splice(idx, 1);
        socket.broadcast.emit('removeUser', user);
     });
});