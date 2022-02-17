const path = require('path');
const multer = require('multer');
const FsStorage = require('../gfs.config')

const multStore = multer({
    storage: FsStorage,
    limits: { fileSize: 20000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    } //use mimetypes property?
});

const checkFileType = function (file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb('filetype');
};

// UPLOAD MIDDLWARE
const uploadSingle = (req, res, next) => {
    const upload = multStore.single('cover'); //must match form
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err); //'File too large'
        } else if (err) {
            if (err === 'filetype') {
                return res.status(400).send('Image files only');
            }
            return res.sendStatus(500);
        }
        next();
    })
};
const uploadMultiple = (req, res, next) => {
    const upload = multStore.array("projImages", 10) //must match form
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err); //'File too large'
        } else if (err) {
            if (err === 'filetype') {
                return res.status(400).send('Image files only');
            }
            return res.sendStatus(500);
        }
        next();
    })
};

module.exports = { uploadSingle, uploadMultiple }