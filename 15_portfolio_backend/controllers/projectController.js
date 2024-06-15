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
