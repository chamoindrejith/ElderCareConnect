const express = require('express');
const app = express();
const cors = require('cors');
const twilio = require("twilio");
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('../backend/src/db/dbconfig.js');
const routes = require('../backend/src/routes/index.js');
const http = require('http');
const socketIo = require('socket.io');
const { initSocket } = require('./src/controllers/chat.controllers.js');
const {sendNotification} = require('./src/controllers/notificationController.js');
const { initializeApp, cert } = require('firebase-admin/app');
const analyticsRoutes = require('./src/routes/analytics.route.js');
app.use('/api/analytics', analyticsRoutes);


const port = process.env.PORT;

const server = http.createServer(app);

const io = socketIo(server);

initSocket(io);

require('./socket.js')(io);

app.use(cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// Firebase Admin SDK Initialization
 initializeApp({
  credential: cert(require('./firebase/firebase-service-account.json')),
  projectId: process.env.FIREBASE_PROJECT_ID,
}); 




app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/send', sendNotification);
database.connectDB();

app.use('/api',routes);

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

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
});
