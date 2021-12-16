const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AKIAYZTILGAZXSTTSXSM,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    key: function (req, file, cb) {
      const fullPath = `memes/${file.originalname}`;
      cb(null, fullPath); //use Date.now() for unique file keys
    },
  }),
});

module.exports = upload;
