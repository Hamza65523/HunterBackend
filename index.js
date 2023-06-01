const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const fs = require('fs') 
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/image", image);

app.get("/", (req, res) => {
  res.send("Welcome our Hunter Api...");
});

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})



const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
