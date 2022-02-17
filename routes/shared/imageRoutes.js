const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// IMAGES ROUTE // for each to get them

router.get('/images/:id', (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id);
    gfs.find({ _id }).toArray((err, file) => {
        if (!file || file.length === 0) {
            console.log(file);
            return res.status(404).json({ err: 'File does not exist' });
        }
        gfs.openDownloadStream(_id).pipe(res);
    });
});
// DELETE IMAGE ROUTE --- should find a way to do it without back and forth;
router.delete('/files/:id', (req, res) => {
    deleteImage(req.params.id);
    res.redirect('back');
});

module.exports.router = router;