require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const Home = require('./models/home');

app.use(express.json());
app.use(morgan('tiny'));

let homes = [
	{
		id: 1,
		description: 'BEAUTIFUL SHACK',
	},
	{
		id: 2,
		description: 'BEAUTIFUL SHACK',
	},
	{
		id: 3,
		description: 'BEAUTIFUL SHACK',
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>');
});

app.get('/api/homes', (request, response) => {
	Home.find({}).then((homes) => {
		response.json(homes);
	});
});

app.get('/api/homes/:id', (request, response) => {
	Home.findById({ _id: request.params.id })
		.then((result) => {
			response.json(result);
		})
		.catch((error) => next(error));
});

app.post('/api/homes', (request, response, next) => {
	const body = request.body;

	if (!body.description || !body) {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	const home = new Home({
		id: body.id,
		description: body.description,
		owner: body.ownder,
		rating: body.rating,
		pictureUrl: body.pictureUrl,
	});
	home
		.save()
		.then((savedHome) => {
			response.json(savedHome);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
