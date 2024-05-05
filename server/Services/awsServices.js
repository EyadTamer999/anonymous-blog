const AWS = require("aws-sdk");
require('dotenv').config();

// AWS configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// create S3 instance
const s3 = new AWS.S3();

// create DynamoDB instance
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = { s3, documentClient }
