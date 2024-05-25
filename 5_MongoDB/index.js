const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/practice_nodejs")
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((err) => console.log("Mongo error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}: ${req.method}: ${req.path}`,
    (err, dta) => {
      next();
    }
  );
});

//ROUTES

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  res.send(allDbUsers);
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map((user, i) => `<li>${i + 1}. ${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>`;
  res.send(html);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log("Body", body);
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "Success", data: result });
});

//dynamic path parameters
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).send("Internal server error");
    }
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    if (!updates) {
      return res
        .status(400)
        .send("Please provide properties to update in the request body");
    }
    try {
      const user = await User.findByIdAndUpdate(id, updates, { new: true }); // Return updated user
      if (user) {
        res.status(201).json({ msg: "Success", data: user });
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Internal server error");
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).send("User is successfully deleted");
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Internal server error");
    }
  });

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
