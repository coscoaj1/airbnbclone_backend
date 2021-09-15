const homesRouter = require('express').Router();
const Home = require('../models/home');
const { uploadFile } = require('./utils/s3');

homesRouter.get('/', (request, response) => {
	Home.find({}).then((homes) => {
		response.json(homes);
	});
});

homesRouter.get('/:id', (request, response) => {
	Home.findById({ _id: request.params.id })
		.then((home) => {
			if (home) {
				response.json(home);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			console.log(error);
			response.status(400).send({ error: 'malformatted id ' });
		});
});

homesRouter.post(
	'/images',
	upload.single('image'),
	async (request, response) => {
		const file = req.file;
		console.log(file);
		const result = await uploadFile(file);
		console.log(result);
		const description = request.body.description;
		response.send('👍');
	}
);

homesRouter.post('/', (request, response, next) => {
	const body = request.body;

	if (!body.description || !body) {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	const home = new Home({
		description: body.description,
		owner: body.owner,
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

homesRouter.delete('/:id', (request, response, next) => {
	Home.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

homesRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const home = {
		description: body.description,
		rating: body.rating,
		pictureUrl: body.pictureUrl,
	};

	Home.findByIdAndUpdate(request.params.id, home, { new: true })
		.then((savedHome) => {
			response.json(savedHome);
		})
		.catch((error) => next(error));
});

module.exports = homesRouter;
