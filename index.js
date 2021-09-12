const { response } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');

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
	response.json(homes);
});

app.get('/api/homes/:id', (request, response) => {
	const id = Number(request.params.id);
	console.log(id);
	const home = homes.find((home) => home.id === id);
	response.json(home);
});

app.post('/api/homes', (request, response) => {
	const home = request.body;
	console.log(home);
	response.json(home);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
