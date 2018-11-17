const http = require("http");
const path = require("path");

const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

require('./sockets')(io);

//settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(3000, () => {
    console.log('server on port 3000', app.get.PORT);
});
