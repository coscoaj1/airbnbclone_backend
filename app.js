const config = require('./utils/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const homesRouter = require('./controllers/homes');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const requestLogger = require('./utils/middleware');

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then((result) => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(express.json());
app.use(morgan('tiny'));
app.use(requestLogger);

app.use('/api/homes', homesRouter);

module.exports = app;
