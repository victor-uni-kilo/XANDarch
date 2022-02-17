const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../../models/Project');
// HOMEPAGE ROUTE
router.get('/', (req, res) => {
  res.render('default/index');
});
// PROJECT_GALLERY ROUTES
router.get('/projects', async (req, res) => {
  let query = Project.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  const projects = await query.exec();
  // provide all categories
  const allProjects = await Project.find();
  let response = {
    allProjects,
    projects: projects,
    searchOptions: req.query,
    filters: true
  };

  try {
    res.status(200).render('default/projects', response );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  let response = {
    project: project,
    files: false
  };
  const imageList = project.projImages;
  let imageIds = [];
  imageList.forEach(file => {
    imageIds.push(new mongoose.Types.ObjectId(file.id));
  });
  try {
    const imageIds = project.projImages;
    if (!imageIds || imageIds.length === 0) {
      res.status(200).render('default/projects/show', response);
    } else {
      await gfs.find({ _id: { $in: imageIds } }).toArray((err, files) => {
        if (!files || files.length === 0) {
          res.status(404).send("File(s) not retrieved");
        } else {
          response.files = files;
          res.status(200).render('default/projects/show', response);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});


// ABOUT ROUTE
router.get('/about', (req, res) => {
  res.render('default/about');
});
// CONTACT ROUTE
router.get('/contact', (req, res) => {
  res.render('default/contact');
});


module.exports.router = router;