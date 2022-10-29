const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const { create } = require("../models/post");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added succesful",
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Actualizacion con exito!",
    });
  })
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Publicaciones expuestas con exito!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post no encontrado' });
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then(() => {
    res.status(200).json({
      message: "Post deleted succesful",
    });
  })
  .catch(() => {
    res.status(404).json({
      message: "Publicacion no borrada",
    });
  });
});

module.exports = router;