const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    developedAt: { type: Date, required: true },
    img: { type: String, required: true },
    url: { type: String, required: true },
    githubUrl: { type: String, required: true },
    description: { type: String, required: true },
    isFork: { type: Boolean, required: true },
    languages: [
      {
        name: { type: String, required: true },
        iconifyClass: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
