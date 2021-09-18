const config = require('./utils/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const homesRouter = require('./controllers/homes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})

	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(middleware.requestLogger);

app.use('/api/homes', homesRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
