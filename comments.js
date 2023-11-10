// Create web server
// This is the main file of the project

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create an instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create a route for the home page
app.get('/', (req, res) => {
    res.send('Hello from server');
});

// Create a route to get all comments
app.get('/comments', (req, res) => {
    Comment.find({}).then((data) => {
        res.json(data);
    });
});

// Create a route to post a comment
app.post('/comments', (req, res) => {
    console.log('Post request');
    console.log(req.body);
    const comment = new Comment(req.body);
    comment.save().then((data) => {
        res.json(data);
    });
});

// Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
    console.log('Delete request');
    Comment.findByIdAndDelete(req.params.id).then((data) => {
        res.json(data);
    });
});

// Create a route to update a comment
app.put('/comments/:id', (req, res) => {
    console.log('Update request');
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((data) => {
        res.json(data);
    });
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
