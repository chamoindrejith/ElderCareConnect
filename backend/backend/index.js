const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const careGiverRoutes = require('./routes/careGiverRoutes');

const app = express();
app.use(cors({
    'credentials': true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/caregivers', careGiverRoutes);

const server = http.createServer(app);

const mongoURL = process.env.MONGODB_URI
mongoose.Promise = Promise;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.log(error));

console.log(mongoURL);

server.listen(8080, () => {
    console.log('Server is running on port http://localhost:8080/');
});