const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const awsConfig = require('./config/s3.config.json');
// const { Pin } = require('../../sequelize/models');

const s3Bucket = new aws.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region
});

const s3Middleware = multer({
    storage: multerS3({
        s3: s3Bucket,
        bucket: 'pinterest-bk',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE
        // key: function (req, file, cb) {
        //     cb(null, `${Date.now()}_${file.originalname}`);
        // },
    })
});

// const s3DeleteMiddleware = async (req, res, next) => {
//     const { pinId } = req.params;
//     const picKeyResult = await Pin.findOne({
//         where: { pinId },
//         attributes: ['picKey'],
//         raw: true
//     });

//     const params = {
//         Bucket: 'pinterest-bk',
//         Key: picKeyResult.dataValues.picKey
//     }

//     s3.deleteObject(params, function (err, data) {
//         if (err) {
//             console.log('aws image delete error')
//             console.log(err, err.stack)
//         } else {
//             console.log('aws image delete success' + data)
//         }
//     })
//     next()
// }

module.exports = s3Middleware;
