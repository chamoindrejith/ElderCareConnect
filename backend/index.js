const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('../backend/src/db/dbconfig.js');
const routes = require('../backend/src/routes/index.js');
const http = require('http');
const socketIo = require('socket.io');
const { initSocket } = require('./src/controllers/chat.controllers.js');

const port = process.env.PORT;

const server = http.createServer(app);

const io = socketIo(server);

initSocket(io);

require('./socket.js')(io);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


database.connectDB();

app.use('/api', routes);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    const userId = socket.handshake.query.userId; // Send userId as part of connection handshake
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    }
});
