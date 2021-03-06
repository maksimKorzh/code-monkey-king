// Import task handker
const Post = require('../api/posts');
const Soft = require('../api/software');
const View = require('../api/views');

// Init router
const express = require('express');
const router = express.Router();

// Init body parser
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Init database hook
const mongoose = require('mongoose');
//const uri = "mongodb://localhost/cmk";
const uri = "mongodb+srv://cmk:342124@todolist-c483l.gcp.mongodb.net/code-monkey-king?retryWrites=true";
var connectionStatus = mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if(err){
    throw err;
  }
  console.log("Connected to database successfully!");
});
const db = mongoose.connection;

// Get home page
router.get('/', (req, res) => res.send('Use localhost:5000/api/tasks'));

// Get posts
router.get('/api/posts', (req, res) => {
  Post.getPosts((err, posts) => {
    if(err){
      throw err;
    }
    res.json(posts);
  })
});

// Add post
router.post('/api/posts', (req, res) => {
  var post = req.body;
  Post.addPost(post, (err, task) => {
    if(err){
      throw err;
    }
    res.json(post);
  })
});

// Get soft
router.get('/api/soft', (req, res) => {
  Soft.getSoft((err, soft) => {
    if(err){
      throw err;
    }
    res.json(soft);
  })
});

// Get views
router.get('/api/views', (req, res) => {
  View.getViews((err, views) => {
    if(err){
      throw err;
    }
    res.json(views);
  })
});

// Update views
router.put('/api/views/:_id', (req, res) => {
  var id = req.params._id;
  var updated = req.body;
  View.updateViews(id, updated, {}, (err, updated) => {
    if(err){
      throw err;
    }
    res.json(updated);
  })
});

module.exports = router;