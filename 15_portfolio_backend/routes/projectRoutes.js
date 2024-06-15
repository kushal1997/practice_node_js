const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const uploadImage = require('../middlewares/multer');

router.get('/', projectController.getProjects);
router.post('/add', uploadImage, projectController.createProject);

router.get('/api/projects', projectController.getAllProjects);
router.post('/api/projects', uploadImage, projectController.createProjectAPI);

module.exports = router;
