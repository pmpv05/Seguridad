const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const router = express.Router();
const routes = require('./routes');

require('./connectors/mongo');

const app = express();

app.use(cors());
app.use(errors());
app.use(bodyParser({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes(router));

// Start application
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running on port ${port}`));
