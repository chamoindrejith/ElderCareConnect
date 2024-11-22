const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('../backend/src/db/dbconfig.js');
const routes = require('../backend/src/routes/index.js');
const port = process.env.PORT;



