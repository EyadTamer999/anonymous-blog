const AWS = require('aws-sdk');
import Sharp from 'sharp';

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    try {
        const imageObject = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        const resizedImage = await Sharp(imageObject.Body)
            .resize({ width: 500 }) // Resize the image to width 500 pixels
            .toBuffer();

        // Upload the resized image to the same bucket
        await s3.putObject({
            Bucket: bucket,
            Key: `resized/${key}`, // Store resized images in a folder named 'resized'
            Body: resizedImage,
            ContentType: 'image/jpeg', // Change the content type according to your image format
        }).promise();

        console.log('Image resized successfully.');
        return 'Image resized successfully.';
    } catch (error) {
        console.error('Error resizing image:', error);
        throw error;
    }
};
