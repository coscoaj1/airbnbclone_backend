require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_BUCKET_REGION;
const AWS_ACCESS_KEY = process.env_AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

module.exports = {
	MONGODB_URI,
	PORT,
	AWS_BUCKET_NAME,
	REGION,
	AWS_SECRET_KEY,
	AWS_ACCESS_KEY,
};
