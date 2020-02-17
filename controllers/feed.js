const {validationResult} = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({ message: 'Fetched Posts Successfully.', posts: posts });
            })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed! The data entered is incorrect!');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title, 
        imageUrl: 'images/299501.jpeg',
        content: content, 
        creator: { name: 'Cyrus Gichuki' }
    });
    post.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Post created Successfully',
                post: result
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post! Try again or another one.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post fetched Successfully!', post: post });
        })
        .catch(err =>{
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};