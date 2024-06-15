const Project = require('../models/project');

exports.createProject = async (req, res) => {
  const { name, url, githubUrl, description, languages } = req.body;
  const img = req.file.location; // Assuming you are using AWS S3 and `req.file.location` provides the image URL

  // Ensure `isFork` is set to a default value or provided in the request body
  const isFork = req.body.isFork || false; // Assuming `isFork` is a boolean field

  try {
    const project = new Project({
      name,
      img,
      url,
      githubUrl,
      description,
      isFork,
      languages: JSON.parse(languages)
    });

    await project.save();
    res.redirect('/');
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server Error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('index', { projects });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server Error');
  }
};

// GET /api/projects - Get all projects
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects); // Respond with JSON array of projects
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  // POST /api/projects - Create a new project
exports.createProjectAPI = async (req, res) => {
    const { name, createdAt, url, githubUrl, description, languages, isFork } = req.body;
    const img = req.file.location; // Assuming you are using AWS S3 and `req.file.location` provides the image URL
  
    try {
      const newProject = new Project({
        name,
        createdAt,
        img,
        url,
        githubUrl,
        description,
        languages: JSON.parse(languages),
        isFork,
      });
  
      const project = await newProject.save();
      res.status(201).json(project); // Respond with JSON object of created project
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };