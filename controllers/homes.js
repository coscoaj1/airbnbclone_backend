const homesRouter = require('express').Router();
const Home = require('../models/home');
const { uploadFile, getFileStream } = require('./../utils/s3');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

homesRouter.get('/', (request, response) => {
	Home.find({}).then((homes) => {
		response.json(homes);
	});
});

homesRouter.get('/:id', async (request, response, next) => {
	const home = await Home.findById(request.params.id);

	if (home) {
		response.json(home);
	} else {
		response.status(404).end();
	}
});

homesRouter.get('/images/:key', (request, response) => {
	const key = request.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(response);
});

homesRouter.post(
	'/images',
	upload.single('image'),
	async (request, response, next) => {
		const body = request.body;
		const file = request.file;
		const result = await uploadFile(file);
		await unlinkFile(file.path);
		const newUrl = result.Location;

		// upload to mongoDB
		const home = new Home({
			description: body.description,
			owner: body.owner,
			rating: body.rating,
			pictureUrl: newUrl,
		});

		const savedHome = await home.save();
		response.json(savedHome);
		response.status(201);

		// home.save().then((savedHome) => {
		// 	response.json(savedHome);
		// });
	}
);

homesRouter.post('/', async (request, response, next) => {
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

	const savedHome = await home.save();
	response.json(savedHome);
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
