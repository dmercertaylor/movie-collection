const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = (fileName, fileContent) => {
    console.log(fileName, fileContent);
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME || 'dmt-movie-posters',
        Key: 'movie-posters/' + fileName, // File name you want to save as in S3
        Body: fileContent.buffer
    };

    // Uploading files to the bucket
    const upload = s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
    return upload.promise();
};