const homesRouter = require('express').Router();
const Home = require('../models/home');
const { uploadFile, getFileStream } = require('./../utils/s3');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const homeImage = require('../models/homeImage');

homesRouter.post(
	'/homeImage',
	upload.single('image'),

	async (req, res, next) => {
		const file = req.file;
		const body = req.body;
		console.log(file, body);
		const result = await uploadFile(file);
		console.log(result);
		await homeImage.create({
			photoUrl: result.Location,
			description: body.description,
			title: body.title,
			price: body.price,
			bedrooms: body.bedrooms,
			beds: body.beds,
			baths: body.baths,
			kitchens: body.kitchens,
			wifi: body.wifi,
			air_conditioning: body.air_conditioning,
			parking: body.parking,
		});
		res.send({ imagePath: `images/${result.Key}` });
	}
);

homesRouter.get('/', (request, response, next) => {
	Home.find({}).then((homes) => {
		response.json(homes);
	});
});

homesRouter.get('/:id', (request, response, next) => {
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

homesRouter.get('/images/:key', (request, response, next) => {
	const key = request.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(response);
});

homesRouter.post(
	'/images',
	upload.single('image'),
	async (request, response, next) => {
		const file = request.file;
		console.log(file);
		const result = await uploadFile(file);
		console.log(result);
		const description = request.body.description;
		response.send({ imagePath: `images/${result.Key}` });
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
		title: body.title,
		description: body.description,
		owner: body.owner,
		rating: body.rating,
		pictureUrl: body.pictureUrl,
		price: body.price,
		bedrooms: body.bedrooms,
		beds: body.beds,
		baths: body.baths,
		kitchens: body.kitchens,
		guests: body.guests,
		reviews: body.reviews,
		wifi: body.wifi,
		air_conditioning: body.air_conditioning,
		parking: body.parking,
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
		title: body.title,
		description: body.description,
		owner: body.owner,
		rating: body.rating,
		pictureUrl: body.pictureUrl,
		price: body.price,
		bedrooms: body.bedrooms,
		beds: body.beds,
		baths: body.baths,
		kitchens: body.kitchens,
		guests: body.guests,
		reviews: body.reviews,
		wifi: body.wifi,
		air_conditioning: body.air_conditioning,
		parking: body.parking,
	};

	Home.findByIdAndUpdate(request.params.id, home, { new: true })
		.then((savedHome) => {
			response.json(savedHome);
		})
		.catch((error) => next(error));
});

module.exports = homesRouter;
