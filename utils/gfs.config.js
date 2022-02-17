const path = require('path');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
//REFs 
const conn = require('./db.config')

// GridFS
conn.once('open', () => { 
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { 
    bucketName: 'images' 
  });
});

const FsStorage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images'
        }
        resolve(fileInfo);
      });
    });
  }
});

module.exports = FsStorage