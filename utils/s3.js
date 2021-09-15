const config = require('./config');
const fs = require('fs');
const S3 = require('aws-sdk/clinets/s3');

const region = config.REGION;
const accessKey = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;
const bucketName = config.AWS_BUCKET_NAME;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

//uploads a file to s3

function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;
