const express = require('express');

const { getPostById, getAllPosts } = require('../services/contentHandlers.js');

const postsRouter = express.Router();

postsRouter.route('/').get(async (_request, response) => {
  const posts = await getAllPosts();

  response.status(200).json({ posts });
});

postsRouter.route('/:id').get(async (request, response, next) => {
  const { id } = request.params;

  const foundPost = await getPostById(id);

  if (!foundPost) {
    return next({ statusCode: 404, message: 'Post not found' });
  } else {
    response.status(200).json(foundPost);
  }
});

module.exports = postsRouter;
