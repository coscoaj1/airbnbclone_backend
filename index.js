const app = require('./app');
const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');

const server = http.createServer(app);

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const PORT = 3001;
server.listen(PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
