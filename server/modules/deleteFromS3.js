const s3 = require('./s3');

module.exports = (objectName) => {
    const deleteParam = {
        Bucket: process.env.BUCKET_NAME || 'dmt-movie-posters',
        Delete: {
            Objects: [
                {Key: objectName}
            ]
        }
    };    

    s3.deleteObjects(deleteParam, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log('delete', data);
    });
}