const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// REFs 
const Project = require('../../models/Project');
const dashLayout = 'layouts/dash-layout';
// REQUIRE MIDDLEWARE
const { uploadMultiple } = require('../../utils/middleware/multerUpload');
const { loggedIn } = require('../../utils/middleware/authMiddleware');

// FUNCTIONS
const deleteImage = id => {
  if (!id || id === undefined) {
    return res.status(400).send('No image id')
  }
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, err => {
    if (err) return res.status(500).send('Image deletion error');
  });
}
// PAGES ROUTE****************************
// FUNCTIONS
const splitCategories = (categoryText) => {
  let categoryArray = [];
  categoryText.split(",").forEach(item => {
    if (item != '') {
      categoryArray.push(item.trim().toLowerCase());
    } 
  });
  return categoryArray;
}
// ----------------------------------------
// MAIN = EDIT-PROJECT ROUTE (all projects)
router.get('/', loggedIn, async (req, res) => {
  
  let query = Project.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  try {
    const projects = await query.exec();
    res.status(200).render('admin/edit-project', {
      layout: dashLayout,
      projects: projects,
      searchOptions: req.query
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// NEW PROJECT ROUTE
router.get('/new', loggedIn, async (req, res) => {
  const project = new Project();
  const allProjects = await Project.find();
  // provide all categories
  let response = {
    allProjects,
    layout: dashLayout,
    project: project
  };
  try {
    res.status(200).render('admin/edit-project/new', response);
  } catch (err) {
    res.status(500).send(err);
  }
});
// CREATE(UPLOAD) ROUTE
router.post('/', loggedIn, uploadMultiple, async (req, res) => {
  let imageIds = [];
  if (req.files || req.files != undefined) {
    const files = req.files;
    files.forEach(file => {
      if (file.size > 5000000) {
        deleteImage(file.id);
        return res.status(400).send("File may NOT exceed 5mb."); // NOT PRINTING LAST CHARACTER / we need this as a flash message
      }
      imageIds.push(file.id);
    });
  }
  // category fallback
  const project = new Project({
    title: req.body.title,
    naslov: req.body.naslov,
    location: req.body.location,
    lokacija: req.body.lokacija,
    area: req.body.area,
    projDate: new Date(req.body.projDate),
    description: req.body.description,
    opis: req.body.opis,
    projImages: imageIds,
    coverImage: imageIds[0],
    categories: splitCategories(req.body.categories),
    kategorije: splitCategories(req.body.kategorije)
  });

  try {
    const newProject = await project.save();
    res.status(201).redirect(`edit-project/${newProject.id}/edit`);
  } catch (err) {
    res.send('PROBLEM: nisu popunjeni svi')
  }
});
// FILES**************************** 
// SHOW SELECTED PROJECT
router.get('/:id', loggedIn, async (req, res) => {
  const project = await Project.findById(req.params.id); //.populate('image.files').exec();
  let response = {
    layout: dashLayout,
    project: project,
    files: false
  };
  const imageList = project.projImages;
  let imageIds = [];
  imageList.forEach(file => {
    imageIds.push(new mongoose.Types.ObjectId(file.id));// check if an id is valid as an object id
  });
  try {
    const imageIds = project.projImages;
    if (!imageIds || imageIds.length === 0) {
      res.status(200).render('admin/edit-project/show', response);
    } else {
      await gfs.find({ _id: { $in: imageIds } }).toArray((err, files) => {
        if (!files || files.length === 0) {
          res.status(404).send("File(s) not retrieved");
        } else {
          response.files = files;
          res.status(200).render('admin/edit-project/show', response);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});
// EDIT SELECTED PROJECTS
router.get('/:id/edit', loggedIn, async (req, res) => {
  const project = await Project.findById(req.params.id); //.populate('image.files').exec();
  
  // provide all categories
  const allProjects = await Project.find();

  let response = {
    allProjects,
    layout: dashLayout,
    project: project,
    files: false
  };

  try {
    const imageIds = project.projImages;
    if (!imageIds || imageIds.length === 0) {
      res.status(200).render('admin/edit-project/edit', response);
    } else {
      await gfs.find({ _id: { $in: imageIds } }).toArray((err, files) => {
        if (!files || files.length === 0) {
          res.status(404).send("File(s) not retrieved");
        } else {
          response.files = files;
          res.status(200).render('admin/edit-project/edit', response);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});


// UPDATE PROJECT ROUTE
router.put('/:id', loggedIn, uploadMultiple, async (req, res) => {

  project = await Project.findById(req.params.id);
  // first delete marked images
  let markedForDeletion = req.body.markedForDeletion;
  let deletionArray = [];
  if (markedForDeletion) {
    if (typeof markedForDeletion == "string") {
      deletionArray.push(markedForDeletion);
    } else {
      deletionArray = markedForDeletion;
    }
    deletionArray.forEach(item => {
      let imgId = mongoose.Types.ObjectId(item);
      deleteImage(imgId);
      project.projImages = project.projImages.filter(img => JSON.stringify(img) != JSON.stringify(imgId));
    });
  }
  // update project
  project.title = req.body.title;
  project.naslov = req.body.naslov;
  project.location = req.body.location;
  project.lokacija = req.body.lokacija;
  project.area = req.body.area;
  project.projDate = new Date(req.body.projDate);
  project.description = req.body.description;
  project.opis = req.body.opis;
  project.categories = splitCategories(req.body.categories);
  project.kategorije = splitCategories(req.body.kategorije);

  if (req.files || req.files != undefined) {
    const files = req.files;
    files.forEach(file => {
      if (file.size > 5000000) {
        deleteImage(file.id);
        return res.status(400).send("File may NOT exceed 5mb.");
      }
      project.projImages.push(file.id);
    });
  }
  // adjust coverImage
  let coverExists = project.projImages.includes(req.body.coverImage);
  if (coverExists == true) {
    project.coverImage = req.body.coverImage;
  } else {
    project.coverImage = project.projImages[0];
  }
  try {
    await project.save();
    res.redirect(`/dashboard/edit-project/${project.id}/edit`);
  } catch (err) {
    res.send(err);
  }
});
// DELETE PROJECT ROUTE
router.delete('/:id', loggedIn, async (req, res) => {
  const project = await Project.findById(req.params.id);
  const imageList = project.projImages;
  //if (!imageList || imageList.length === 0 ) { return res.status(400).send('Image does not exist') }; //BREAKING CHANGE
  try {
    if (imageList.length != 0) {
      await imageList.forEach(imgId => {
        const id = new mongoose.Types.ObjectId(imgId);
        deleteImage(id);
      });
    }
    await project.remove();
    res.redirect('/dashboard/edit-project');
  } catch (error) {
    res.send(err);
  }
});

module.exports.router = router;
