//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var _ = require('lodash');

const homeStartingContent = "Daily Journal is a motivational blog where you find new motivational quotes daily, and kickstart your day with enthusiasm and commitment.";
const aboutContent = "This website is created by Harshit Kumar, a developer from India. Currently an engineering student, and available for freelance work. For more details go to contact page.";

const app = express();

// setting up mongoose server port
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// postSchema
const postSchema = {
  title: String,
  content: String
};

// creating Posts collection
const Post = mongoose.model("Post", postSchema);

// setting up view engine EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


var posts = [];

// root route
app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  })
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
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
})

// custom pages 
app.get("/posts/:postId", (req, res) => {
  var requestedPostId = req.params.postId;
  Post.findOne({
    _id: requestedPostId
  }, (err, post) => {
    if (err) {
      res.render("error");
    } else {
      res.render("post", {
        title: post.title,
        body: post.content
      });
    }
  })
})

// invalid routes
app.get("*", (req, res) => {
  res.render("error");
})



// server port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});