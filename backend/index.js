const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('../backend/src/db/dbconfig.js');
const routes = require('../backend/src/routes/index.js');
const socketIo = require('socket.io');
const { initSocket } = require('./src/controllers/chat.controllers.js');

const port = process.env.PORT;
const http = require('http');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
database.connectDB();

app.use('/api', routes);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});