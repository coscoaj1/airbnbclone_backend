const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Home = require('../models/home');

const api = supertest(app);

describe('Homes API', () => {
	jest.setTimeout(30000);

	it('returns a status code 200', async () => {
		await api.get('/api/homes').expect(200);
	});

	it('returns content type json', async () => {
		await api.get('/api/homes').expect('Content-Type', /application\/json/);
	});

	it('GET /homes/id --> 404 if not found', async () => {
		await api.get('/api/homes/6143176fc66f9147104b7b29').expect(404);
	});

	it('POST /homes --> created home', async () => {
		await api
			.post('/api/homes')
			.send({
				description: 'green house',
				owner: 'old lady',
				pictureUrl: 'www.google.com',
			})
			.expect('Content-Type', /application\/json/)
			.expect(200);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
