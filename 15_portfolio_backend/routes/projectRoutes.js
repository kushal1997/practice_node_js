const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const uploadImage = require('../middlewares/multer');

router.get('/', projectController.getProjects);
router.post('/add', uploadImage, projectController.createProject);

module.exports = router;
