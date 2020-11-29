//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Daily Journal is a motivational blog where you find new motivational quotes daily, and kickstart your day with enthusiasm and commitment.";
const aboutContent = "This website is created by Harshit Kumar, a developer from India. Currently an engineering student, and available for freelance work. For more details go to contact page.";

const app = express();

// setting up view engine EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


var posts = [];

// root route
app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})

// about page
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
})

// contact us page
app.get("/contact", (req, res) => {
  res.render("contact");
})

// hidden compose page
app.get("/compose", (req, res) => {
  res.render("compose");
})

// hidden compose page
app.post("/compose", (req, res) => {
  var post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})

// custom pages 
app.get("/posts/:postName", (req, res) => {
  var requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    var storedTitle = _.lowerCase(post.postTitle);
    if (storedTitle == requestedTitle) {
      res.render("post", {
        title: post.postTitle,
        body: post.postBody
      });
    } 
  })
  res.render("error");
})

// invalid routes
app.get("*", (req, res) => {
  res.render("error");
})



// server port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});