const express = require("express");
const fs=require('fs')
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//middleware - plugin
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
  fs.appendFile("log.txt",`\n ${Date.now()}: ${req.method}: ${req.path}`,(err,dta)=>{
    next();

  })
})

app.use((req,res,next)=>{
  console.log("Heelo from middleware 2");
  return res.end("Hey")
})
//ROUTES

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user, i) => `<li>${i + 1}. ${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.post("/api/users", (req, res) => {
  const body=req.body;
  console.log("Body",body);
  users.push({...body,id:users.length+1});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status:"success",id:users.length,userData:data});
  })
});

//dynamic path parameters
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);

//   return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {});

// app.delete("/api/users/:id", (req, res) => {});

//insted of creating different routes for same api we can do like this
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  })
  .patch((req, res) => {
    const id=Number(req.params.id);
    const updates=req.body;

    const userIndex=users.findIndex(user=>user.id===id);
    if(userIndex !== -1){
      const userToUpdate=users[userIndex];
      const allowedUpdates = ['first_name', 'last_name', 'email', 'gender', 'job_title'];
      const validUpdates = Object.keys(updates).every(update => allowedUpdates.includes(update));
      if (!validUpdates) {
        return res.status(400).send('Invalid update property');
      }
  
      // Update the user's properties
      Object.assign(userToUpdate, updates);
  
      res.json(userToUpdate);
      return;
    }
    res.status(404).send('User not found');
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
  
    if (userIndex !== -1) {
      users.splice(userIndex, 1); // Remove the user from the array
      res.status(200).send("User is successfully deleted"); // No content to return on successful deletion
    } else {
      res.status(404).send('User not found');
    }
  });

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
