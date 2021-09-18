const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('homes are returned as json, with a status code 200', async () => {
	await api
		.get('/api/homes')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

afterAll(() => {
	mongoose.connection.close();
});
